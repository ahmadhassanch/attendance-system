import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/users/user/dto';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsEnum,
  ValidateNested,
  IsString,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { EmployeeType } from '@prisma/client';

export class CreateEmployeeDto {
  @ApiProperty({
    required: false,
    example: 'employeeNo',
    description: 'The employeeNo of the Employee',
  })
  @IsOptional()
  @IsString()
  employeeNo?: string;

  @ApiProperty({
    required: false,
    example: 'CHI_US',
    enum: EmployeeType,
    description: 'The employeeType of the Employee',
  })
  @IsOptional()
  @IsEnum(EmployeeType)
  employeeType?: EmployeeType;

  @ApiProperty({
    required: false,
    example: 'managerId',
    description: 'The managerId of the Employee',
  })
  @IsOptional()
  @IsString()
  managerId?: string;

  @ApiProperty({ required: true, type: CreateUserDto })
  @ValidateNested({ each: false })
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
