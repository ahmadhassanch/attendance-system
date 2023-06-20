import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRecordTypeDto {
  @ApiProperty({
    required: true,
    example: 'breakName',
    description: 'The breakName of the RecordType',
  })
  @IsString()
  breakName: string;

  @ApiProperty({
    required: true,
    example: 'breakDescription',
    description: 'The breakDescription of the RecordType',
  })
  @IsString()
  breakDescription: string;
}
