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
export async function insertCompanyArray(faker: Faker, prisma: PrismaClient, count: number = 5) {
  let newArr: Prisma.CompanyUncheckedCreateInput[] = [];

  // Getting candidateIds from the system - if foreign key present
  let candidateIds: { [modelName: string]: string[] } = {};

  // Get only those candidateIds are valid for the corresponding column
  await findCandidateIds(prisma, candidateIds);

  // Now in the begining of the loop we will pick values which satisfy unique constaint
  // Once valid values are found, they are passed to getOne function, to return a valid
  // which can be inserted via prima.createMany()
  while (newArr.length < count) {

    let d: Prisma.CompanyUncheckedCreateInput = getOneCompany(faker, candidateIds, );
    newArr.push(d);
  }
  await prisma.company.createMany({ data: newArr });
}

/**
 * Returns an object containing fake data for a single role record.
 * @param roleName - The name of the role.
 * @returns An object containing fake data for a single role record.
 */
function getOneCompany(faker: Faker, candidateIds: { [modelName: string]: string[] }, ): Prisma.CompanyUncheckedCreateInput {
  return {
    companyId: faker.datatype.uuid(),
    name:  faker.word.noun(),
    phone:  faker.word.noun(),
    email:  faker.word.noun(),
    fax:  faker.word.noun(),
    address:  faker.word.noun(),
    city:  faker.word.noun(),
    postalCode:  faker.word.noun(),
    state:  faker.word.noun(),
    settings:  faker.word.noun(),
    pocId: randomValueFromArray(candidateIds['pocId'], false),
    isDeleted:  faker.datatype.boolean(),
    dateCreated: faker.datatype.bigInt({ min: unixTimestamp() - 604800, max: unixTimestamp()-302400 }),
    dateUpdated: faker.datatype.bigInt({ min: unixTimestamp() - 302400, max: unixTimestamp() - 0 }),
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

  let pocIdArr = await prisma.employee.findMany({
    select: { employeeId: true },
  });
  candidateIds['pocId'] = pocIdArr.map((item) => item.employeeId);
}
