import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsInt } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    required: true,
    example: 'name',
    description: 'The name of the Company',
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: 'phone',
    description: 'The phone of the Company',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    required: false,
    example: 'email',
    description: 'The email of the Company',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    required: false,
    example: 'fax',
    description: 'The fax of the Company',
  })
  @IsOptional()
  @IsString()
  fax?: string;

  @ApiProperty({
    required: true,
    example: 'address',
    description: 'The address of the Company',
  })
  @IsString()
  address: string;

  @ApiProperty({
    required: true,
    example: 'city',
    description: 'The city of the Company',
  })
  @IsString()
  city: string;

  @ApiProperty({
    required: false,
    example: 'postalCode',
    description: 'The postalCode of the Company',
  })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiProperty({
    required: false,
    example: 'state',
    description: 'The state of the Company',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({
    required: true,
    example: 'settings',
    description: 'The settings of the Company',
  })
  @IsString()
  settings: string;

  @ApiProperty({
    required: true,
    example: 'pocId',
    description: 'The pocId of the Company',
  })
  @IsString()
  pocId: string;
}
