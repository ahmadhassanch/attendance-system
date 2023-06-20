import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

import { Observable, tap } from 'rxjs';
import { EnvironmentVars } from 'src/common/common.types';
import { performance } from 'perf_hooks';
// import { RMSLogService } from 'src/workflows/logs/api-call-logs/log.service';

@Injectable({ scope: Scope.REQUEST })
export class RequestResponseInterceptor implements NestInterceptor {
  constructor(
    private configService: ConfigService,
  ) // private readonly logService: RMSLogService,
  {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    if (this.configService.get<number>(EnvironmentVars.LOG_REQUESTS) == 0) {
      return next.handle();
    }

    const req: Request = context.switchToHttp().getRequest();
    // const req: Request = context.switchToHttp().
    console.log('========================================');
    console.log(`${req.headers.host}${req.url}`);
    console.dir(req.body, { depth: Infinity });
    console.log('========================================');
    const startTime = performance.now();
    // const apiCallLogId = await this.logService.logTimeStart(req);

    return next.handle().pipe(
      tap(async (responseBody) => {
        // const endTime = performance.now();
        console.log('****************************************');
        console.dir(responseBody, { depth: Infinity });
        // const timeTaken = endTime - startTime;
        // console.log(`Time taken: ${timeTaken} ms`);
        console.log('****************************************');
        // await this.logService.logTimeEnd(responseBody, apiCallLogId, startTime);
      }),
    );
  }
}
