import { Faker } from '@faker-js/faker';
import { MakeTimedIDUnique, modelPrimaryKeys, unixTimestamp } from '../../../../src/common/common.helper';
import { Prisma, PrismaClient } from '@prisma/client';
import { randomValueFromArray } from '../../seed-utils/fake-array';
const md5 = require('md5');

/**
 * Inserts a specified number of fake role records into the database using Prisma.
 * @param prisma {PrismaClient} - The PrismaClient instance used to interact with the database.
 * @param count {number} - The number of fake role records to create. Defaults to 5.
 */
export async function insertUserSettingArray(faker: Faker, prisma: PrismaClient, count: number = 5) {
  let newArr: Prisma.UserSettingUncheckedCreateInput[] = [];
  let currentArr = await prisma.userSetting.findMany({ select: { userId: true, } });
  let userId_Arr = currentArr.map((item) => item.userId);

  // Getting candidateIds from the system - if foreign key present
  let candidateIds: { [modelName: string]: string[] } = {};

  // Get only those candidateIds are valid for the corresponding column
  await findCandidateIds(prisma, candidateIds);

  // Now in the begining of the loop we will pick values which satisfy unique constaint
  // Once valid values are found, they are passed to getOne function, to return a valid
  // which can be inserted via prima.createMany()
  while (newArr.length < count) {
    // This foreign column has @unique constaint,
    let userId = randomValueFromArray(candidateIds['userId'], true);
    userId_Arr.push(userId);

    let d: Prisma.UserSettingUncheckedCreateInput = getOneUserSetting(faker, candidateIds, userId, );
    newArr.push(d);
  }
  await prisma.userSetting.createMany({ data: newArr });
}

/**
 * Returns an object containing fake data for a single role record.
 * @param roleName - The name of the role.
 * @returns An object containing fake data for a single role record.
 */
function getOneUserSetting(faker: Faker, candidateIds: { [modelName: string]: string[] }, userId: string, ): Prisma.UserSettingUncheckedCreateInput {
  return {
    userSettingId: faker.datatype.uuid(),
    notify:  faker.datatype.boolean(),
    language:  faker.word.noun(),
    //valid values has already been found by calling function.
    userId: userId,
    userSettingJson:  faker.word.noun(),
  };
}

/**
 * Finds candidate IDs for various data models based on certain criteria and populates the
 * provided 'candidateIds' object with the results.
 *
 * @param prisma - The Prisma client used to access the database.
 * @param candidateIds - An object that maps data model names to arrays of candidate IDs.
 *                       This function adds candidate IDs to this object based on certain criteria.
 * @returns - This function does not return anything directly, but it populates the 'candidateIds'
 *            object with additional candidate IDs based on certain criteria.
 */
async function findCandidateIds(
  prisma: PrismaClient, 
  candidateIds: { [modelName: string]: string[] }) {

  let userIdArr = await prisma.user.findMany({
    // This column has a unique constraint.
    where: {
      userSetting: null,
    },
    select: { userId: true },
  });
  candidateIds['userId'] = userIdArr.map((item) => item.userId);
}
