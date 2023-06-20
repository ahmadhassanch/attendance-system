import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma/prisma-client-exception.filter';
import { PrismaService } from './prisma/prisma.service';
// import { ScheduleNotificationService } from './utilities/schedule-notification/schedule-notification.service';
import { TenantConfig } from './multi-tenant/multi-tenant.config';

// import { applyMigrations } from './utilities/parse-tenants';//AHMAD commented

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

function processSchedules(configService: ConfigService) {
  const tenantConfigs: { [host: string]: TenantConfig } =
    configService.get('multiTenant');

  for (const [host, tConfig] of Object.entries(tenantConfigs)) {
    const prisma = new PrismaService({
      logQueries: false,
      url: `mysql://${tConfig.DB_USER}:${tConfig.DB_PASSWORD}@${tConfig.DB_HOST_MAIN}/${tConfig.DB_NAME}?connection_limit=1`,
    });
    // const scheduleNotifService = new ScheduleNotificationService(
    //   prisma,
    //   configService,
    // );
    // // sched

    prisma.$disconnect();
  }
}

async function bootstrap() {
  if (process.env.RUN_MIGRATIONS == '1') {
    // applyMigrations(); //AHMAD commented
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(`${process.env.URL_PREFIX ?? 'rms/v1'}`);
  app.use(cookieParser(process.env.AUTH_COOKIE_SECRET));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new PrismaClientExceptionFilter());

  app.use(bodyParser.json({ limit: '2mb' }));
  app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('Remote Monitoring System')
    .setDescription(
      'The Charms-RMS API description.\n\n' +
        'Ctrl+F on this page to find your desired Workflow. For example: "register-patient"',
    )
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    `${process.env.URL_PREFIX ?? 'rms/v1'}/swagger`,
    app,
    document,
    { swaggerOptions: { displayRequestDuration: true } },
  );

  await app.init();
  // app.

  const configService = app.get(ConfigService);
  processSchedules(configService);

  await app.listen(3000);
}
bootstrap();
