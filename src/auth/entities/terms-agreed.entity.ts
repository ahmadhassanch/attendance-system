import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class TermsAgreed {
  @ApiProperty({ required: true })
  @IsBoolean()
  termsAgreed: boolean;
}
