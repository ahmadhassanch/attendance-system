import { ApiProperty, PickType } from '@nestjs/swagger';
import { EmployeeType } from '@prisma/client';
import { RoleType } from 'src/common/common.types';
import { IsChiString } from 'src/common/decorators/is-chi-string.decorator';
import { CreateUserDto } from 'src/modules/users/user/dto';
// import { UserSettingDto } from 'src/modules/users/user/dto';

export class Profile {
  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ required: true, example: 'string' })
  fullName: string;

  @ApiProperty({ required: true, example: 'string' })
  firstName: string;

  @ApiProperty({ required: false, example: 'string or null' })
  middleName: string;

  @ApiProperty({ required: false, example: 'string or null' })
  lastName?: string;

  @ApiProperty({ required: true, example: 'string' })
  mobile: string;

  @ApiProperty({ required: false, example: 'string or null' })
  patientId?: string;

  @ApiProperty({ required: false, example: 'string or null' })
  guardianId?: string;

  @ApiProperty({ required: false, example: 'string or null' })
  employeeId?: string;

  @ApiProperty({ required: false, example: 'string or null' })
  employeeType?: EmployeeType;

  @ApiProperty({ required: true, example: 'boolean' })
  isSuperAdmin: boolean;

  @ApiProperty({ required: true, example: 'boolean' })
  showAnonymousData: boolean;

  @ApiProperty({ required: true, example: 'string', isArray: true })
  roles: {
    role: RoleType;
  }[];

  // @ApiProperty({ required: true, example: 'UserSettingDto' })
  // userSetting: UserSettingDto;

  constructor(
    userId: string,
    fullName: string,
    firstName: string,
    middleName: string | null,
    lastName: string | null,
    mobile: string | null,
    // patientId: string | null,
    // guardianId: string | null,
    employeeId: string | null,
    employeeType: EmployeeType | null,
    isSuperAdmin: boolean,
    // showAnonymousData: boolean,
    roles: {
      role: RoleType;
    }[],
    // userSetting: UserSettingDto,
  ) {
    this.userId = userId;
    this.fullName = fullName;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.mobile = mobile;
    // this.patientId = patientId;
    // this.guardianId = guardianId;
    this.employeeId = employeeId;
    this.employeeType = employeeType;
    this.isSuperAdmin = isSuperAdmin;
    // this.showAnonymousData = showAnonymousData;
    this.roles = roles;
    // this.userSetting = userSetting;
  }
}

export class MobileDto extends PickType(CreateUserDto, ['mobile']) {
  @ApiProperty({ required: false })
  @IsChiString({ optional: true })
  appSignature: string;
}
