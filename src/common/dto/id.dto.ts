import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IDDto {
  @ApiProperty({ required: true })
  @IsString()
  id: string;
}
