import { IntersectionType, PickType } from '@nestjs/swagger';
import { CreateUserCodeDto } from 'src/modules/users/user-code/dto';
import { CreateUserDto } from 'src/modules/users/user/dto';

class UserBase extends PickType(CreateUserDto, ['mobile', 'password']) {}
class UserCodeBase extends PickType(CreateUserCodeDto, ['codeType', 'code']) {}

export class ResetPasswordDto extends IntersectionType(
  UserBase,
  UserCodeBase,
) {}
