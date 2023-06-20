import { Module } from '@nestjs/common';
import { UserCodeService } from './user-code.service';
import { UserCodeController } from './user-code.controller';

@Module({
  controllers: [UserCodeController],
  providers: [UserCodeService],
})
export class UserCodeModule {}
