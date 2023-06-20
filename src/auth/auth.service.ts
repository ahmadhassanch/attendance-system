import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService, PrismaTransaction } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CodeType, User } from '@prisma/client';
import { Request } from 'express';
// import { MobileDto } from 'src/workflows/register-patient/dto';

import * as md5 from 'md5';

import {
  MakeTimedIDUnique,
  _getNumericUniqueCode,
  datesForCreate,
  decryptText,
  getHost,
  unixTimestamp,
} from 'src/common/common.helper';

import { Profile, ResendCodeDto, ResetPasswordDto, VerifyCodeDto } from './dto';

import { PRISMA_SERVICE } from '../multi-tenant/multi-tenant.module';
import { Masking, SmsService } from 'src/utilities/sms/sms.service';
import { CreateUserCodeDto } from 'src/modules/users/user-code/dto';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVars, RoleType } from 'src/common/common.types';
import { UserSessionService } from 'src/modules/users/user-session/user-session.service';
import { TermsAgreed } from './entities/terms-agreed.entity';

import { MobileDto } from './dto/profile';

interface DeviceInfo {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  deviceModel: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly smsService: SmsService,
    private readonly configService: ConfigService,
    private readonly userSessionService: UserSessionService,
  ) {}

  async validateUser(req: Request) {
    const host = getHost(req);
    const encPassword: string | undefined = req.body.enc_password;
    let mobile: string = req.body.mobile;
    const userNo = req.body.mobile;
    let pass: string = req.body.password;
    let deviceId: string = req.body?.deviceId;

    if (!!encPassword) {
      const parts = req.body.enc_password.split('.');
      mobile = decryptText(parts[0]);
      pass = decryptText(parts[1]);
    }

    if (!mobile || !pass) {
      throw new BadRequestException('Login request malformed');
    }

    const hashPassword = md5(pass);
    const user = await this.prisma.user.findFirst({
      select: {
        userId: true,
        password: true,
        gender: true,
        birthDate: true,
        mobile: true,
        firstName: true,
        lastName: true,
        middleName: true,
        fullName: true,
        username: true,
        email: true,
        title: true,
        userSetting: {
          select: {
            userSettingJson: true,
          },
        },
      },
      where: { mobile: mobile, phoneVerified: true },
    });

    let userPatientDetail;
    let exception;
    if (!!user) {
      // userPatientDetail = await this.prisma.user.findUniqueOrThrow({
      //   select: {
      //     patient: { select: { patientId: true } },
      //   },
      //   where: { userId: user.userId },
      // });

      if (hashPassword != user.password) {
        exception = new UnauthorizedException(
          'Phone no. and password mismatch',
        );
      }
    } else {
      exception = new UnauthorizedException('Invalid phone no. or password');
    }

    if (exception === undefined) {
      let ususualDevice = false;

      if (!!deviceId) {
        // const userDevice = await this.prisma.userDevice.findFirst({
        //   select: {
        //     userDeviceId: true,
        //   },
        //   where: {
        //     deviceId: deviceId,
        //     userId: user.userId,
        //   },
        // });
        // const userDeviceCount = await this.prisma.userDevice.count({
        //   where: { userId: user.userId },
        // });
        // if (userDeviceCount > 0 && userDevice === null) {
        //   ususualDevice = true;
        // }
      }

      const { password, ...ret } = user;
      return ret;
    } else {
      console.log('here');
    }

    throw exception;
  }

  async login(
    userInfo: User & { userSetting: { userSettingJson: string } },
    fcmToken: string,
    deviceInfo: DeviceInfo,
  ) {
    const userRole = await this.prisma.userRole.findFirst({
      select: {
        role: true,
        user: { select: { roles: { select: { role: true } } } },
      },
      where: {
        userId: userInfo?.userId,
        role: 'SUPERADMIN',
      },
    });

    // const patient = await this.prisma.patient.findUnique({
    //   select: {
    //     patientId: true,
    //     height: true,
    //     user: { select: { roles: { select: { role: true } } } },
    //   },
    //   where: { userId: userInfo.userId },
    // });

    // const guardian = await this.prisma.guardian.findUnique({
    //   select: {
    //     guardianId: true,
    //     user: {
    //       select: {
    //         userSetting: { select: { userSettingJson: true } },
    //         roles: { select: { role: true } },
    //       },
    //     },
    //   },
    //   where: { userId: userInfo.userId },
    // });

    const employee = await this.prisma.employee.findUnique({
      select: {
        employeeId: true,
        // showAnonymousData: true,
        employeeType: true,
        user: { select: { roles: { select: { role: true } } } },
      },
      where: { userId: userInfo.userId },
    });

    console.log(employee);

    let roles: {
      role: RoleType;
    }[];
    // if (patient) {
    //   roles = patient.user.roles as { role: RoleType }[];
    // } else
    if (employee) {
      roles = employee.user.roles as { role: RoleType }[];
    }
    // else if (guardian) {
    //   roles = guardian.user.roles as { role: RoleType }[];
    // } else if (userRole) {
    //   roles = userRole.user.roles as { role: RoleType }[];
    // }

    const { userSetting, ...restUserInfo } = userInfo;
    const userSettingJson: {
      units: { temperature: 'C' | 'F'; weight: 'kg' | 'lb' };
    } = JSON.parse(userSetting.userSettingJson);

    const profile = new Profile(
      userInfo.userId,
      userInfo.fullName,
      userInfo.firstName,
      userInfo.middleName,
      userInfo.lastName,
      userInfo.mobile,
      // patient ? patient.patientId : null,
      // guardian ? guardian.guardianId : null,
      employee ? employee.employeeId : null,
      employee ? employee.employeeType : null,
      userRole ? true : false,
      // employee ? employee.showAnonymousData : false,
      roles,
      // userSettingJson,
    );

    const user = {
      ...restUserInfo,
      userSetting: userSettingJson,
      // height: patient ? patient.height : null,
    };

    let userDevice: { userDeviceId: string } = null;
    // if (!!deviceInfo.deviceId) {
    //   userDevice = await this.prisma.userDevice.findFirst({
    //     select: {
    //       userDeviceId: true,
    //     },
    //     where: {
    //       deviceId: deviceInfo.deviceId,
    //       userId: userInfo.userId,
    //     },
    //   });
    // }

    await this.prisma.$transaction(async () => {
      if (!!fcmToken && fcmToken.length > 0) {
        await this.prisma.userSession.deleteMany({
          where: { sessionData: { equals: fcmToken } },
        });
      }

      await this.userSessionService.create({
        device: 'Not important',
        userId: userInfo.userId,
        sessionData: fcmToken,
      });

      // if (userDevice === null && !!deviceInfo.deviceId) {
      //   userDevice = await this.prisma.userDevice.create({
      //     select: {
      //       userDeviceId: true,
      //     },
      //     data: {
      //       userDeviceId: MakeTimedIDUnique(),
      //       deviceId: deviceInfo.deviceId,
      //       userId: userInfo.userId,
      //       deviceName: deviceInfo.deviceName,
      //       deviceModel: deviceInfo.deviceModel,
      //       deviceType: deviceInfo.deviceType,
      //     },
      //   });
      // }
    });

    const payload = {
      user,
      profile,
      userDeviceId: userDevice?.userDeviceId ?? MakeTimedIDUnique(),
    };

    const encodedJWT = this.jwtService.sign(payload);

    const load = {
      user,
      profile,
      auth_token: encodedJWT,
    };

    return load;
  }

  async createUserCode(
    tx: PrismaTransaction,
    createUserCodeDto: CreateUserCodeDto,
  ) {
    const { userId, ...createUserCode } = createUserCodeDto;

    const existingCodes = await tx.userCode.findMany({
      where: {
        userId: userId,
        codeType: createUserCodeDto.codeType,
      },
    });

    if (existingCodes.length > 0) {
      console.error(existingCodes);
      throw new ConflictException('A verification code already exists!');
    }

    return tx.userCode.create({
      data: {
        userCodeId: MakeTimedIDUnique(),
        ...createUserCode,
        ...datesForCreate(),
        user: userId ? { connect: { userId: userId } } : undefined,
      },
    });
  }

  async forgotPassword(mobileDto: MobileDto) {
    const user = await this.prisma.user.findFirstOrThrow({
      select: { userId: true },
      where: { mobile: mobileDto.mobile, phoneVerified: true },
    });

    const userCode: CreateUserCodeDto = {
      code: _getNumericUniqueCode(4),
      codeType: CodeType.FORGOT_PASSWORD,
      expiresAt: BigInt(unixTimestamp() + 3600),
      userId: user.userId,
      appSignature: mobileDto.appSignature,
    };

    try {
      await this.prisma.$transaction(async (tx) => {
        await this.createUserCode(tx, userCode);
        await this.smsService.sendForgotPasswordCode(
          mobileDto.mobile,
          userCode.code,
          this.configService.getOrThrow<string>(
            EnvironmentVars.SMS_METHOD,
          ) as Masking,
          userCode.appSignature,
        );
      });
    } catch (err) {
      if (err instanceof ConflictException) {
        return await this.resendCode({
          ...mobileDto,
          codeType: 'FORGOT_PASSWORD',
        });
      } else {
        throw err;
      }
    }
    // CODE SENT IN RESPONSE, DELETE THIS
    return userCode.code;
  }

  /**
   *
   * @returns **user.userId**
   * @throws NotFoundException if user does not exist
   * @throws ForbiddenException if user's phone is not verified
   * @throws UnauthorizedException if code does not match expected value
   */
  async verifyCode(verifyCodeDto: VerifyCodeDto) {
    const user = await this.prisma.user.findUniqueOrThrow({
      select: {
        userId: true,
        phoneVerified: true,
      },
      where: { mobile: verifyCodeDto.mobile },
    });

    if (!user.phoneVerified) {
      throw new ForbiddenException('Phone is not verified');
    }

    const userCode = await this.prisma.userCode.findFirst({
      where: {
        userId: user.userId,
        codeType: verifyCodeDto.codeType,
        expiresAt: { gte: unixTimestamp() },
      },
    });

    if (!userCode || userCode.code !== verifyCodeDto.code) {
      throw new UnauthorizedException('Code is invalid');
    }

    return user.userId;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const userId = await this.verifyCode(resetPasswordDto);

    await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        select: { firstName: true, fullName: true, mobile: true },
        data: { password: md5(resetPasswordDto.password) },
        where: { userId: userId },
      });

      await tx.userCode.deleteMany({
        where: {
          codeType: resetPasswordDto.codeType,
          userId: userId,
        },
      });

      await this.smsService.sendResetPasswordMsg(
        user.mobile,
        user.fullName,
        this.configService.getOrThrow<string>(
          EnvironmentVars.SMS_METHOD,
        ) as Masking,
      );
    });
  }

  async resendCode(resendCodeDto: ResendCodeDto) {
    const currentTimestamp = unixTimestamp();

    const userCodeOld = await this.prisma.userCode.findFirst({
      include: { user: { select: { mobile: true } } },
      where: {
        user: { mobile: resendCodeDto.mobile },
        codeType: resendCodeDto.codeType,
      },
    });

    if (!userCodeOld) {
      throw new BadRequestException(
        'No code for this purpose has been generated. Cannot resend.',
      );
    } else if (currentTimestamp - Number(userCodeOld.dateCreated) < 60) {
      throw new HttpException(
        'Code already sent. Please retry after one minute!',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const userCodeNew: CreateUserCodeDto = {
      code: _getNumericUniqueCode(4),
      codeType: CodeType.FORGOT_PASSWORD,
      expiresAt: BigInt(currentTimestamp + 3600),
      userId: userCodeOld.userId,
      appSignature: resendCodeDto.appSignature,
    };

    await this.prisma.$transaction(async (tx) => {
      await tx.userCode.deleteMany({
        where: {
          userId: userCodeOld.userId,
          codeType: resendCodeDto.codeType,
          expiresAt: { gte: currentTimestamp },
        },
      });
      await this.createUserCode(tx, userCodeNew);

      if (resendCodeDto.codeType === 'FORGOT_PASSWORD') {
        await this.smsService.sendForgotPasswordCode(
          userCodeOld.user.mobile,
          userCodeNew.code,
          this.configService.getOrThrow<string>(
            EnvironmentVars.SMS_METHOD,
          ) as Masking,
          resendCodeDto.appSignature,
        );
      } else if (resendCodeDto.codeType === 'ACCOUNT_VERIFICATION') {
        await this.smsService.sendAccountVerificationCode(
          userCodeOld.user.mobile,
          userCodeNew.code,
          this.configService.getOrThrow<string>(
            EnvironmentVars.SMS_METHOD,
          ) as Masking,
          resendCodeDto.appSignature,
        );
      } else {
        throw new NotImplementedException(
          'This type of code is not yet supported!',
        );
      }
    });

    // CODE SENT IN RESPONSE, DELETE THIS
    return userCodeNew.code;
  }

  async logout(fcmToken: string) {
    const server_name = 'auth/logout';

    if (!!fcmToken && fcmToken.length > 0 && fcmToken.length > 0) {
      console.log(fcmToken);
      await this.prisma.userSession.deleteMany({
        where: { sessionData: { equals: fcmToken } },
      });
    }

    // await this.auditLogsService.create({
    //   auditTime: unixTimestamp(),
    //   employeeId: profile.employeeId,
    //   patientId: profile.patientId,
    //   module: AuditModuleType.SYSTEM,
    //   actionType: ActionsType.LOG_OUT,
    //   message: `logged-out from ${server_name} `,
    // });
  }

  // async getTermsAgreed(patientId: string): Promise<TermsAgreed> {
  //   const patient = await this.prisma.patient.findUniqueOrThrow({
  //     select: { termsAgreed: true },
  //     where: { patientId },
  //   });

  //   return { termsAgreed: patient.termsAgreed };
  // }

  // async agreeToTerms(patientId: string, termsAgreed: TermsAgreed) {
  //   await this.prisma.$transaction(async (tx) => {
  //     const patient = await tx.patient.findUniqueOrThrow({
  //       where: {
  //         patientId,
  //       },
  //     });
  //     // await tx.patient.update({
  //     //   data: { termsAgreed: termsAgreed.termsAgreed },
  //     //   where: { patientId },
  //     // });
  //     if (
  //       termsAgreed.termsAgreed &&
  //       (patient.activationStatus === ActivationStatus.REFERRED ||
  //         patient.activationStatus === ActivationStatus.ASSIGNED)
  //     ) {
  //       // await tx.patient.update({
  //       //   data: { activationStatus: ActivationStatus.ACTIVE },
  //       //   where: { patientId },
  //       // });
  //     }
  //   });
  // }
}
