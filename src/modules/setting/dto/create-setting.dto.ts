import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateSettingDto {
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
