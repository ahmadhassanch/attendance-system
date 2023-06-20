import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsOptional,
  IsEnum,
  IsString,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { CodeType } from '@prisma/client';

export class CreateUserCodeDto {
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
}
