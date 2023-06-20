import {
  PartialType,
  OmitType,
  ApiProperty,
  IntersectionType,
  PickType,
} from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';

import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { UserEntity } from 'src/modules/users/user/entities';
import { UpdateUserDto } from 'src/modules/users/user/dto';

class UserIdDto extends PickType(UserEntity, ['userId']) {}

class UpdateUserInsideEmployeeDto extends IntersectionType(
  UserIdDto,
  UpdateUserDto,
) {}

export class UpdateEmployeeDto extends PartialType(
  OmitType(CreateEmployeeDto, ['user']),
) {
  @ValidateNested({ each: false })
  @Type(() => UpdateUserInsideEmployeeDto)
  @ApiProperty({
    type: UpdateUserInsideEmployeeDto,
    isArray: false,
    required: false,
  })
  user?: UpdateUserInsideEmployeeDto;
}
