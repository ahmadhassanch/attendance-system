import { PartialType } from '@nestjs/swagger';
import { CreateRecordTypeDto } from './create-record-type.dto';

export class UpdateRecordTypeDto extends PartialType(CreateRecordTypeDto) {}
