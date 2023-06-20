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
export async function insertEmployeeArray(faker: Faker, prisma: PrismaClient, count: number = 5) {
  let newArr: Prisma.EmployeeUncheckedCreateInput[] = [];
  let currentArr = await prisma.employee.findMany({ select: { employeeNo: true, userId: true, } });
  let employeeNo_Arr = currentArr.map((item) => item.employeeNo);
  let userId_Arr = currentArr.map((item) => item.userId);

  // Getting candidateIds from the system - if foreign key present
  let candidateIds: { [modelName: string]: string[] } = {};

  // Get only those candidateIds are valid for the corresponding column
  await findCandidateIds(prisma, candidateIds);

  // Now in the begining of the loop we will pick values which satisfy unique constaint
  // Once valid values are found, they are passed to getOne function, to return a valid
  // which can be inserted via prima.createMany()
  while (newArr.length < count) {
    let employeeNo =  faker.word.noun().slice(-20);
    if (employeeNo_Arr.includes(employeeNo)) continue;
    // This foreign column has @unique constaint,
    let userId = randomValueFromArray(candidateIds['userId'], true);
    employeeNo_Arr.push(employeeNo);
    userId_Arr.push(userId);

    let d: Prisma.EmployeeUncheckedCreateInput = getOneEmployee(faker, candidateIds, employeeNo, userId, );
    newArr.push(d);
  }
  await prisma.employee.createMany({ data: newArr });
}

/**
 * Returns an object containing fake data for a single role record.
 * @param roleName - The name of the role.
 * @returns An object containing fake data for a single role record.
 */
function getOneEmployee(faker: Faker, candidateIds: { [modelName: string]: string[] }, employeeNo: string, userId: string, ): Prisma.EmployeeUncheckedCreateInput {
  return {
    employeeId: faker.datatype.uuid(),
    //valid values has already been found by calling function.
    employeeNo: employeeNo,
    employeeType: "PRACTICE_EMPLOYEE",
    //valid values has already been found by calling function.
    userId: userId,
    managerId: randomValueFromArray(candidateIds['managerId'], false),
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

  let userIdArr = await prisma.user.findMany({
    // This column has a unique constraint.
    where: {
      employee: null,
    },
    select: { userId: true },
  });
  candidateIds['userId'] = userIdArr.map((item) => item.userId);

  let managerIdArr = await prisma.employee.findMany({
    select: { employeeId: true },
  });
  candidateIds['managerId'] = managerIdArr.map((item) => item.employeeId);
}
