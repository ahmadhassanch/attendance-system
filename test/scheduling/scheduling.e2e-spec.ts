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
import { EnvironmentVars } from 'src/common/common.types';
import { OrderType, RMSSchedule } from '@prisma/client';
import { RMSScheduleEntity } from 'src/modules/admission/rms-schedule/entities';

(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

describe('Charms Accounts NestJS (e2e)', () => {
  let app: INestApplication;
  let authToken: string = '';
  let prisma: PrismaService;

  let baseUrl: string;
  let rmsOrderId: string;
  let rmsSchedules: RMSScheduleEntity[];

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
      logQueries: configService.get<number>(EnvironmentVars.LOG_QUERIES) == 1,
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

  describe('Scheduling', () => {
    describe('/scheduling', () => {
      describe('POST /create-order', () => {
        const endpoint = '/scheduling/create-order';
        it('should create a new rms order with schedule instances', async () => {
          const rmsAdmissionId = '4257b992-c8db-4da6-a61e-fa2198258fd0',
            orderById = '0a6924d3-b2ec-4fcc-8f89-5010f5dd3d6f',
            orderableId = '2';

          const res = await request(baseUrl)
            .post(endpoint)
            .set('Authorization', authToken)
            .send({
              rmsAdmissionId: rmsAdmissionId,
              orderableId: orderableId,
              orderById: orderById,
              alertGap: 10,
              graceTime: 1800,
              orderType: OrderType.DAILY,
              rmsSchedules: [
                {
                  startTime: getTimeStamp('2023-04-06 09:00:00'),
                  endTime: getTimeStamp('2023-04-09 09:00:00'),
                  repeatValue: 2,
                  repeatUnit: 'DAY',
                },
                {
                  startTime: getTimeStamp('2023-04-06 16:00:00'),
                  endTime: getTimeStamp('2023-04-09 16:00:00'),
                  repeatValue: 2,
                  repeatUnit: 'Day',
                },
              ],
            });
          rmsOrderId = res.body.rmsOrderId;
          rmsSchedules = res.body.rmsSchedules;

          console.log(res.body.message);
          expect(res.statusCode).toEqual(HttpStatus.CREATED);
        });
      });
    });

    describe('POST /register-orderable-value', () => {
      const endpoint = '/scheduling/register-orderable-value';
      it('should register an orderable value, optionally attaching to schedule instance', async () => {
        const res = await request(baseUrl)
          .post(endpoint)
          .set('Authorization', authToken)
          .send({
            orderableId: '2',
            patientId: '3e43202d-7216-4576-9066-41870d9d21f9',
            observationTime: 1680165226,
            acquisitionTime: 1680165226,
            captureTime: 1680165226,
            readingTime: 1680165226,
            status: 'NORMAL',
            resultableValues: [
              {
                resultableId: '1',
                numericValue: 101,
                status: 'NORMAL',
              },
              {
                resultableId: '2',
                numericValue: 110,
                status: 'NORMAL',
              },
            ],
          });

        console.log(res.body.message);
        expect(res.statusCode).toEqual(HttpStatus.CREATED);
      });
    });

    describe('PATCH /update-order', () => {
      const endpoint = '/scheduling/update-order/';
      it('should update an order and its schedules, deleting and recreating schedule instances appropriately', async () => {
        const res = await request(baseUrl)
          .patch(endpoint + rmsOrderId)
          .set('Authorization', authToken)
          .send({
            alertGap: 101,
            graceTime: 1801,
            rmsSchedules: rmsSchedules.map((schedule) => {
              return {
                rmsScheduleId: schedule.rmsScheduleId,
                endTime: Number(schedule.endTime) - 3 * 86400,
                repeatValue: schedule.repeatValue + 1,
              };
            }),
          });

        console.log(res.body.message);
        expect(res.body).toEqual({ id: rmsOrderId });
      });
    });
  });
});
