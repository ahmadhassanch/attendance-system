import { Prisma, PrismaClient } from '@prisma/client';
import { getTimeStamp } from '../../../src/common/common.helper';

async function testActiveOrderable() {
  const prisma = new PrismaClient(); //test
  console.log('hello world');

  let patientId = 'AHSAN-PATIENT-ID';
  let startDateTime = getTimeStamp('2023-04-12 08:00:00');
  let endDateTime = getTimeStamp('2023-04-13 10:00:00');

  endDateTime = endDateTime ?? 9999999999;

  let result = await prisma.rMSOrder.findMany({
    select: {
      rmsOrderId: true,
      orderable: { select: { orderableId: true, name: true } },
    },
    where: {
      rmsAdmission: { patientId: 'AHSAN-PATIENT-ID' },
      orderableId: { not: 'MED-ORDERABLE-ID' },
      rmsSchedules: {
        some: {
          OR: [
            { startTime: { gte: startDateTime, lte: endDateTime } },
            { endTime: { gte: startDateTime, lte: endDateTime } },
            {
              startTime: { lte: startDateTime },
              endTime: { gte: endDateTime },
            },
          ],
        },
      },
    },
  });
  console.log(result);
}

async function testActiveMedication() {
  const prisma = new PrismaClient(); //test
  console.log('hello world');

  let patientId = 'AHSAN-PATIENT-ID';
  let startDateTime = getTimeStamp('2023-04-01 08:00:00');
  let endDateTime = getTimeStamp('2023-04-02 10:00:00');

  endDateTime = endDateTime ?? 9999999999;

  let result = await prisma.rMSOrder.findMany({
    select: {
      rmsOrderId: true,
      // orderable: { select: { orderableId: true, name: true } },
      medication: { select: { name: true } },
    },
    where: {
      rmsAdmission: { patientId: 'AHSAN-PATIENT-ID' },
      orderableId: 'MED-ORDERABLE-ID',
      rmsSchedules: {
        some: {
          OR: [
            { startTime: { gte: startDateTime, lte: endDateTime } },
            { endTime: { gte: startDateTime, lte: endDateTime } },
            {
              startTime: { lte: startDateTime },
              endTime: { gte: endDateTime },
            },
          ],
        },
      },
    },
  });
  console.log(result);
}

async function main() {
  //   await testActiveOrderable();
  await testActiveMedication();
}

main();
