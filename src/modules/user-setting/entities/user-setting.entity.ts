import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UserSettingEntity {
  @ApiProperty({
    required: true,
    example: 'userSettingId',
    description: 'The userSettingId of the UserSetting',
  })
  @IsString()
  userSettingId: string;

  @ApiProperty({
    required: false,
    example: false,
    description: 'The notify of the UserSetting',
  })
  @IsOptional()
  @IsBoolean()
  notify?: boolean;

  @ApiProperty({
    required: false,
    example: 'language',
    description: 'The language of the UserSetting',
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({
    required: true,
    example: 'userId',
    description: 'The userId of the UserSetting',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    required: true,
    example: 'userSettingJson',
    description: 'The userSettingJson of the UserSetting',
  })
  @IsString()
  userSettingJson: string;
}
