import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';

import { CommonService } from './common/common.service';

@Injectable()
export class AppService {
  constructor(
    private commonService: CommonService,
    private configService: ConfigService,
    @InjectKnex() private knex: Knex,
  ) {}

  getViewName(): string {
    return 'index';
  }

  async call_api() {
    return await this.commonService.getExternalApi(
      'https://jsonplaceholder.typicode.com/todos/1',
    );
  }
}
