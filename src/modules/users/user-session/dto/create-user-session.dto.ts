import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserSessionDto {
  @ApiProperty({
    required: true,
    example: 'sessionData',
    description: 'The sessionData of the UserSession',
  })
  @IsString()
  sessionData: string;

  @ApiProperty({
    required: true,
    example: 'device',
    description: 'The device of the UserSession',
  })
  @IsString()
  device: string;

  @ApiProperty({
    required: false,
    example: 'deviceName',
    description: 'The deviceName of the UserSession',
  })
  @IsOptional()
  @IsString()
  deviceName?: string;

  @ApiProperty({
    required: false,
    example: 'deviceModel',
    description: 'The deviceModel of the UserSession',
  })
  @IsOptional()
  @IsString()
  deviceModel?: string;

  @ApiProperty({
    required: false,
    example: 'osName',
    description: 'The osName of the UserSession',
  })
  @IsOptional()
  @IsString()
  osName?: string;

  @ApiProperty({
    required: false,
    example: 'osVersion',
    description: 'The osVersion of the UserSession',
  })
  @IsOptional()
  @IsString()
  osVersion?: string;

  @ApiProperty({
    required: true,
    example: 'userId',
    description: 'The userId of the UserSession',
  })
  @IsString()
  userId: string;
}
