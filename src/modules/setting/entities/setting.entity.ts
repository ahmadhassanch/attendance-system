import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SettingEntity {
  @ApiProperty({
    required: true,
    example: 'settingId',
    description: 'The settingId of the Setting',
  })
  @IsString()
  settingId: string;

  @ApiProperty({
    required: true,
    example: 'settingName',
    description: 'The settingName of the Setting',
  })
  @IsString()
  settingName: string;

  @ApiProperty({
    required: true,
    example: 'settingJson',
    description: 'The settingJson of the Setting',
  })
  @IsString()
  settingJson: string;
}
