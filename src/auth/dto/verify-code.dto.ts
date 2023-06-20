import { IntersectionType, PickType } from '@nestjs/swagger';
import { CreateUserCodeDto } from 'src/modules/users/user-code/dto';
import { CreateUserDto } from 'src/modules/users/user/dto';

class UserCodeBase extends PickType(CreateUserCodeDto, ['codeType', 'code']) {}
class UserBase extends PickType(CreateUserDto, ['mobile']) {}

export class VerifyCodeDto extends IntersectionType(UserBase, UserCodeBase) {}
