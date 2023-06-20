import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import * as fk from './tables';


export async function fakeData(prisma: PrismaClient) {
  faker.seed(0);

  await fk.insertUserArray(faker, prisma, 5);
  await fk.insertSettingArray(faker, prisma, 5);
  await fk.insertRecordTypeArray(faker, prisma, 5);
  await fk.insertUserSessionArray(faker, prisma, 5);
  await fk.insertUserCodeArray(faker, prisma, 5);
  await fk.insertUserSettingArray(faker, prisma, 5);
  await fk.insertUserRoleArray(faker, prisma, 5);
  await fk.insertEmployeeArray(faker, prisma, 5);
  await fk.insertCompanyArray(faker, prisma, 5);
  await fk.insertTaskArray(faker, prisma, 5);
  await fk.insertAttendanceArray(faker, prisma, 5);
}
