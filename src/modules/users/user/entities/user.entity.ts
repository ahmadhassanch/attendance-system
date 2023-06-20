import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsOptional,
  IsEnum,
  IsString,
  IsInt,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { Gender } from '@prisma/client';

export class UserEntity {
  @ApiProperty({
    required: true,
    example: 'userId',
    description: 'The userId of the User',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    required: true,
    example: 'username',
    description: 'The username of the User',
  })
  @IsString()
  username: string;

  @ApiProperty({
    required: true,
    example: 'password',
    description: 'The password of the User',
  })
  @IsString()
  password: string;

  @ApiProperty({
    required: true,
    example: 'firstName',
    description: 'The firstName of the User',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    required: false,
    example: 'image',
    description: 'The image of the User',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    required: false,
    example: 'title',
    description: 'The title of the User',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    required: false,
    example: 'middleName',
    description: 'The middleName of the User',
  })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({
    required: false,
    example: 'lastName',
    description: 'The lastName of the User',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    required: true,
    example: 'fullName',
    description: 'The fullName of the User',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    required: false,
    example: 'MALE',
    enum: Gender,
    description: 'The gender of the User',
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    required: false,
    description: 'The birthDate of the User',
  })
  @IsOptional()
  @IsInt()
  birthDate?: bigint;

  @ApiProperty({
    required: false,
    example: 'email',
    description: 'The email of the User',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    required: true,
    example: 'mobile',
    description: 'The mobile of the User',
  })
  @IsString()
  mobile: string;

  @ApiProperty({
    required: false,
    example: 'phone',
    description: 'The phone of the User',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    required: false,
    example: 'nic',
    description: 'The nic of the User',
  })
  @IsOptional()
  @IsString()
  nic?: string;

  @ApiProperty({
    required: false,
    example: 'address1',
    description: 'The address1 of the User',
  })
  @IsOptional()
  @IsString()
  address1?: string;

  @ApiProperty({
    required: false,
    example: 'address2',
    description: 'The address2 of the User',
  })
  @IsOptional()
  @IsString()
  address2?: string;

  @ApiProperty({
    required: false,
    example: 'zipCode',
    description: 'The zipCode of the User',
  })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({
    required: false,
    example: false,
    description: 'The isActivated of the User',
  })
  @IsOptional()
  @IsBoolean()
  isActivated?: boolean;

  @ApiProperty({
    required: false,
    example: false,
    description: 'The emailVerified of the User',
  })
  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;

  @ApiProperty({
    required: false,
    example: false,
    description: 'The phoneVerified of the User',
  })
  @IsOptional()
  @IsBoolean()
  phoneVerified?: boolean;

  @ApiProperty({
    required: false,
    example: false,
    description: 'The useTwoFactor of the User',
  })
  @IsOptional()
  @IsBoolean()
  useTwoFactor?: boolean;

  @ApiProperty({
    required: false,
    example: 'otpSecret',
    description: 'The otpSecret of the User',
  })
  @IsOptional()
  @IsString()
  otpSecret?: string;

  @ApiProperty({
    required: false,
    example: 'emergencyContactPerson',
    description: 'The emergencyContactPerson of the User',
  })
  @IsOptional()
  @IsString()
  emergencyContactPerson?: string;

  @ApiProperty({
    required: false,
    example: 'emergencyContactPhone',
    description: 'The emergencyContactPhone of the User',
  })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @ApiProperty({
    required: false,
    example: 101,
    description: 'The userInt of the User',
  })
  @IsOptional()
  @IsNumber()
  userInt?: number;

  @ApiProperty({
    required: false,
    description: 'The userDate of the User',
  })
  @IsOptional()
  @IsInt()
  userDate?: bigint;

  @ApiProperty({
    required: false,
    example: 'userString',
    description: 'The userString of the User',
  })
  @IsOptional()
  @IsString()
  userString?: string;

  @ApiProperty({
    required: false,
    example: 101,
    description: 'The userFloat of the User',
  })
  @IsOptional()
  @IsNumber()
  userFloat?: number;

  @ApiProperty({
    required: false,
    example: false,
    description: 'The isDeleted of the User',
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    required: true,
    description: 'The dateCreated of the User',
  })
  @IsInt()
  dateCreated: bigint;

  @ApiProperty({
    required: true,
    description: 'The dateUpdated of the User',
  })
  @IsInt()
  dateUpdated: bigint;
}
