import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RecordTypeEntity {
  @ApiProperty({
    required: true,
    example: 'breakTypeId',
    description: 'The breakTypeId of the RecordType',
  })
  @IsString()
  breakTypeId: string;

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
