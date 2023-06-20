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
export async function insertUserArray(faker: Faker, prisma: PrismaClient, count: number = 5) {
  let newArr: Prisma.UserUncheckedCreateInput[] = [];
  let currentArr = await prisma.user.findMany({ select: { username: true, email: true, mobile: true, nic: true, } });
  let username_Arr = currentArr.map((item) => item.username);
  let email_Arr = currentArr.map((item) => item.email);
  let mobile_Arr = currentArr.map((item) => item.mobile);
  let nic_Arr = currentArr.map((item) => item.nic);

  // Getting candidateIds from the system - if foreign key present
  let candidateIds: { [modelName: string]: string[] } = {};

  // Get only those candidateIds are valid for the corresponding column
  await findCandidateIds(prisma, candidateIds);

  // Now in the begining of the loop we will pick values which satisfy unique constaint
  // Once valid values are found, they are passed to getOne function, to return a valid
  // which can be inserted via prima.createMany()
  while (newArr.length < count) {
    let username =  faker.word.noun();
    if (username_Arr.includes(username)) continue;
    let email =  faker.word.noun();
    if (email_Arr.includes(email)) continue;
    let mobile =  faker.word.noun();
    if (mobile_Arr.includes(mobile)) continue;
    let nic =  faker.word.noun();
    if (nic_Arr.includes(nic)) continue;
    username_Arr.push(username);
    email_Arr.push(email);
    mobile_Arr.push(mobile);
    nic_Arr.push(nic);

    let d: Prisma.UserUncheckedCreateInput = getOneUser(faker, candidateIds, username, email, mobile, nic, );
    newArr.push(d);
  }
  await prisma.user.createMany({ data: newArr });
}

/**
 * Returns an object containing fake data for a single role record.
 * @param roleName - The name of the role.
 * @returns An object containing fake data for a single role record.
 */
function getOneUser(faker: Faker, candidateIds: { [modelName: string]: string[] }, username: string, email: string, mobile: string, nic: string, ): Prisma.UserUncheckedCreateInput {
  return {
    userId: faker.datatype.uuid(),
    //valid values has already been found by calling function.
    username: username,
    password:  faker.word.noun(),
    firstName:  faker.word.noun(),
    image:  faker.word.noun(),
    title:  faker.word.noun(),
    middleName:  faker.word.noun(),
    lastName:  faker.word.noun(),
    fullName:  faker.word.noun(),
    gender: "OTHER",
    birthDate:  faker.datatype.bigInt(),
    //valid values has already been found by calling function.
    email: email,
    //valid values has already been found by calling function.
    mobile: mobile,
    phone:  faker.word.noun(),
    //valid values has already been found by calling function.
    nic: nic,
    address1:  faker.word.noun(),
    address2:  faker.word.noun(),
    zipCode:  faker.word.noun(),
    isActivated:  faker.datatype.boolean(),
    emailVerified:  faker.datatype.boolean(),
    phoneVerified:  faker.datatype.boolean(),
    useTwoFactor:  faker.datatype.boolean(),
    otpSecret:  faker.word.noun(),
    emergencyContactPerson:  faker.word.noun(),
    emergencyContactPhone:  faker.word.noun(),
    userInt:  faker.datatype.number(),
    userDate:  faker.datatype.bigInt(),
    userString:  faker.word.noun(),
    userFloat:  faker.datatype.number(),
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
}
