import { PartialType } from '@nestjs/swagger';
import { CreateUserCodeDto } from './create-user-code.dto';

export class UpdateUserCodeDto extends PartialType(CreateUserCodeDto) {}
