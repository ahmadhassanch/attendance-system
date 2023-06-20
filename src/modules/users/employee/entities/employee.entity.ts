import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/users/user/entities';
import {
  IsOptional,
  IsEnum,
  IsString,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { EmployeeType } from '@prisma/client';

export class EmployeeEntity {
  @ApiProperty({
    required: true,
    example: 'employeeId',
    description: 'The employeeId of the Employee',
  })
  @IsString()
  employeeId: string;

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

  @ApiProperty({
    required: false,
    example: false,
    description: 'The isDeleted of the Employee',
  })
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({
    required: true,
    description: 'The dateCreated of the Employee',
  })
  @IsInt()
  dateCreated: bigint;

  @ApiProperty({
    required: true,
    description: 'The dateUpdated of the Employee',
  })
  @IsInt()
  dateUpdated: bigint;

  @ApiProperty({ required: true, type: UserEntity })
  user: UserEntity;
}
