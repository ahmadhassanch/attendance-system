import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';
import { ScheduleModule } from '@nestjs/schedule';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CommonModule } from './common/common.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ModulesModule } from './modules/modules.module';
import { UtilitiesModule } from './utilities/utilities.module';

import { MultiTenantMiddleware } from './multi-tenant/multi-tenant.middleware';
import {
  MultiTenantModule,
  TENANT_CONFIG,
} from './multi-tenant/multi-tenant.module';
import multiTenantConfig, {
  TenantConfig,
} from './multi-tenant/multi-tenant.config';
import { RequestResponseInterceptor } from './logger/request-response.interceptor';
import { EnvironmentVars } from './common/common.types';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    MultiTenantModule,
    ModulesModule,
    UtilitiesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [multiTenantConfig],
    }),
    ScheduleModule.forRoot(),
    NestjsFormDataModule.configAsync({
      imports: [MultiTenantModule],
      inject: [TENANT_CONFIG],
      useFactory: (tConfig: TenantConfig) => {
        return {
          storage: FileSystemStoredFile,
          fileSystemStoragePath: `./${tConfig.DATA_STORAGE_ROOT}`,
          autoDeleteFile: false,
        };
      },
    }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          client: 'mysql2',
          useNullAsDefault: true,
          pool: { min: 0, max: 0 },
          debug: configService.get<number>(EnvironmentVars.LOG_QUERIES) == 0,
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MultiTenantMiddleware).forRoutes('*');
  }
}
