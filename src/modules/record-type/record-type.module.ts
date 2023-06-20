import { Module } from '@nestjs/common';
import { RecordTypeService } from './record-type.service';
import { RecordTypeController } from './record-type.controller';

@Module({
  controllers: [RecordTypeController],
  providers: [RecordTypeService],
})
export class RecordTypeModule {}
