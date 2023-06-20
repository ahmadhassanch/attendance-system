import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
expect.extend(require('jest-extended'));

import { AppModule } from '../../src/app.module';
import { PrismaClientExceptionFilter } from '../../src/prisma/prisma-client-exception.filter';
import { PrismaService } from '../../src/prisma/prisma.service';

import { urlPrefix } from '../constants';
import { ConfigService } from '@nestjs/config';
import { TenantConfig } from '../../src/multi-tenant/multi-tenant.config';
import { getTimeStamp } from 'src/workflows/scheduling/helpers/date_utils';

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

describe('Charms Accounts NestJS (e2e)', () => {
  let app: INestApplication;
  let authToken: string = '';
  let prisma: PrismaService;

  let baseUrl: string;

  beforeAll(async () => {
    jest.setTimeout(40000);
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser(process.env.AUTH_COOKIE_SECRET));
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    app.useGlobalFilters(new PrismaClientExceptionFilter());

    await app.init();
    baseUrl = app.getHttpServer();

    const configService = app.get(ConfigService);
    const tConfig: TenantConfig =
      configService.get('multiTenant')['localhost:3000'];
    prisma = new PrismaService({
      logQueries: configService.get<number>('LOG_QUERIES') == 1,
      url: `mysql://${tConfig.DB_USER}:${tConfig.DB_PASSWORD}@${tConfig.DB_HOST_MAIN}/${tConfig.DB_NAME}?connection_limit=20`,
    });
  });

  afterAll(async () => {
    // await prisma.roles.delete({
    //   where: { role_id: idToGet },
    // });
    await app.close();
  });

  describe('Auth', () => {
    it('Login', async () => {
      const response = await request(baseUrl).post('/auth/login').send({
        mobile: '090078601',
        password: 'Testing@1',
      });
      authToken = response.body.auth_token; // save access token for rest tests
      console.log(authToken);
      expect(response.statusCode).toEqual(HttpStatus.OK);
    });
  });

  describe('AdmissionDevices', () => {
    describe('/admission-devices', () => {
      describe('GET /admission-devices', () => {
        const endpoint = '/admission-devices/get-admission-devices';
        it('should get admission devices and their resultables data', async () => {
          const res = await request(baseUrl)
            .get(endpoint)
            .set('Authorization', authToken)
            .query({ patientId: 'b5555408-0d40-4bca-8c6c-bd6b5f3ec909' })
            .expect(HttpStatus.OK);

          console.dir(res.body, { depth: 10 });
        });
      });
    });
  });
});
