import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { IsChiString } from 'src/common/decorators/is-chi-string.decorator';
import { CreateUserCodeDto } from 'src/modules/users/user-code/dto';
import { CreateUserDto } from 'src/modules/users/user/dto';

class UserBase extends PickType(CreateUserDto, ['mobile']) {}
class UserCodeBase extends PickType(CreateUserCodeDto, ['codeType']) {}

export class ResendCodeDto extends IntersectionType(UserBase, UserCodeBase) {
  @ApiProperty({ required: false })
  @IsChiString({ optional: true })
  appSignature: string;
}
