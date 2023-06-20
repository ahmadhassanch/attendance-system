import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { CommonService } from './common.service';
import { CrudService } from './crud/crud.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [CommonService, CrudService],
  exports: [CommonService, CrudService],
})
export class CommonModule {}
