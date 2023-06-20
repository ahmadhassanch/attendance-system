import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { TenantConfig } from '../multi-tenant/multi-tenant.config';
import { TENANT_CONFIG } from '../multi-tenant/multi-tenant.module';
import {
  LoginDto,
  Profile,
  MobileDto,
  ResendCodeDto,
  ResetPasswordDto,
  VerifyCodeDto,
} from './dto';
import { AuthService } from './auth.service';
import { GetUser, Permissions, Public } from './decorators';
import { LoginGuard } from './guards/login.guard';

// import { MobileDto } from 'src/workflows/register-patient/dto';
import { LoginEntity } from './entities';
import { User } from '@prisma/client';
import { PermissionsGuard } from './guards/permissions.guard';
import { TermsAgreed } from './entities/terms-agreed.entity';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(TENANT_CONFIG) private tConfig: TenantConfig,
  ) {}

  @Public()
  @ApiOkResponse({ type: LoginEntity })
  @UseGuards(LoginGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @GetUser() user: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const deviceInfo = {
      deviceId: loginDto.deviceId,
      deviceName: loginDto.deviceName,
      deviceModel: loginDto.deviceModel,
      deviceType: loginDto.deviceType,
    };

    const payload = await this.authService.login(
      user,
      loginDto.fcmToken,
      deviceInfo,
    );

    res.cookie(this.tConfig.AUTH_COOKIE_NAME, payload.auth_token, {
      signed: true,
    });

    return payload;
  }

  @Public()
  @ApiOkResponse()
  @Get('logout')
  async logout(
    @Query('fcmToken') fcmToken: string,
    @Res({ passthrough: true })
    res: Response,
  ) {
    await this.authService.logout(fcmToken);
    res.clearCookie(this.tConfig.AUTH_COOKIE_NAME, { signed: true });
  }

  @Public()
  @ApiTags('forgot-password')
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('forgot-password')
  forgotPassword(@Body() mobileDto: MobileDto) {
    return this.authService.forgotPassword(mobileDto);
  }

  @Public()
  @ApiTags('forgot-password')
  @Post('verify-code')
  @HttpCode(HttpStatus.OK)
  verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
    return this.authService.verifyCode(verifyCodeDto);
  }

  @Public()
  @ApiTags('forgot-password')
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Public()
  @ApiTags('forgot-password', 'register-patient')
  @Post('resend-code')
  @HttpCode(HttpStatus.OK)
  resendCode(@Body() resendCodeDto: ResendCodeDto) {
    return this.authService.resendCode(resendCodeDto);
  }

  // @Permissions('TermsAgreed.View')
  // @UseGuards(PermissionsGuard)
  // @ApiOkResponse({ type: TermsAgreed })
  // @Get('agree-terms')
  // getTermsAgreed(@GetUser('profile') profile: Profile) {
  //   return this.authService.getTermsAgreed(profile.patientId);
  // }

  // @Permissions('TermsAgreed.Create')
  // @UseGuards(PermissionsGuard)
  // @HttpCode(HttpStatus.OK)
  // @Post('agree-terms')
  // agreeToTerms(
  //   @GetUser('profile') profile: Profile,
  //   @Body() termsAgreed: TermsAgreed,
  // ) {
  //   return this.authService.agreeToTerms(profile.patientId, termsAgreed);
  // }
}
