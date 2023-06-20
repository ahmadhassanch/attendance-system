import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsOptional,
  IsEnum,
  IsString,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { CodeType } from '@prisma/client';

export class UserCodeEntity {
  @ApiProperty({
    required: true,
    example: 'userCodeId',
    description: 'The userCodeId of the UserCode',
  })
  @IsString()
  userCodeId: string;

  @ApiProperty({
    required: true,
    example: 'ACCOUNT_VERIFICATION',
    enum: CodeType,
    description: 'The codeType of the UserCode',
  })
  @IsEnum(CodeType)
  codeType: CodeType;

  @ApiProperty({
    required: true,
    example: 'code',
    description: 'The code of the UserCode',
  })
  @IsString()
  code: string;

  @ApiProperty({
    required: true,
    description: 'The expiresAt of the UserCode',
  })
  @IsInt()
  expiresAt: bigint;

  @ApiProperty({
    required: false,
    example: 'appSignature',
    description: 'The appSignature of the UserCode',
  })
  @IsOptional()
  @IsString()
  appSignature?: string;

  @ApiProperty({
    required: true,
    example: 'userId',
    description: 'The userId of the UserCode',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    required: false,
    example: false,
    description: 'The isDeleted of the UserCode',
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    required: true,
    description: 'The dateCreated of the UserCode',
  })
  @IsInt()
  dateCreated: bigint;

  @ApiProperty({
    required: true,
    description: 'The dateUpdated of the UserCode',
  })
  @IsInt()
  dateUpdated: bigint;
}
