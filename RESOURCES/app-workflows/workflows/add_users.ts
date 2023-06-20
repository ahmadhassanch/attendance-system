import { ApiClient } from '../lib/api-client';
import { Prisma, PrismaClient } from '@prisma/client';

const md5 = require('md5');

export async function addGuardianToPatient(
  patientId: string,
  guardianId: string,
): Promise<{ [key: string]: any }> {
  const req = {
    guardianId: guardianId,
  };
  let data: { [key: string]: any } = await ApiClient.patch(
    '/patient-new' + '/' + patientId,
    req,
  );
  return data['guardianId'];
}

export async function createGuardian(
  username: string,
): Promise<{ [key: string]: any }> {
  //   const userId = await createUser(username);
  const req = {
    isDeleted: false,
    user: {
      roleType: 'GUARDIAN',
      username: username,
      password: md5(username),
      firstName: username,
      email: `${username}@email.com`,
      mobile: `${username}-mobile`,
    },
  };
  let data: { [key: string]: any } = await ApiClient.post('/guardian', req);
  return { guardianId: data['guardianId'], userId: data['user']['userId'] };
}

export async function createEmployee(
  username: string,
  roleType: string,
): Promise<{ [key: string]: any }> {
  //   const userId = await createUser(username);
  const req = {
    employeeNo: `${username}_no`,
    // isDeleted: false,
    user: {
      // roleType: roleType,

      username: username,
      password: md5(username),
      firstName: username,
      email: `${username}@email.com`,
      mobile: `${username}-mobile`,
    },
    // employeeRoles: [
    //   {
    //     role: roleType,
    //   },
    // ],
  };

  // console.log(req);
  let data: { [key: string]: any } = await ApiClient.post('/employee', req);
  return { employeeId: data['employeeId'], userId: data['user']['userId'] };
}

export async function createDoctor(
  username: string,
  spId: string,
): Promise<{ [key: string]: any }> {
  //   const userId = await createUser(username);
  const req = {
    employeeNo: `${username}_no`,
    specialtyId: spId,
    // isDeleted: false,
    user: {
      username: username,
      password: md5(username),
      firstName: username,
      email: `${username}@email.com`,
      mobile: `${username}-mobile`,
    },
    // employeeRoles: [
    //   {
    //     role: 'SUPERADMIN',
    //   },
    // ],
  };

  // console.log(req);
  let data: { [key: string]: any } = await ApiClient.post('/employee', req);
  return { employeeId: data['employeeId'], userId: data['user']['userId'] };
}

export async function createPatient(
  username: string,
): Promise<{ [key: string]: any }> {
  //   const userId = await createUser(username);
  const req = {
    hospitalNo: `${username}_no`,
    user: {
      username: username,
      password: md5(username),
      firstName: username,
      email: `${username}@email.com`,
      mobile: `${username}-mobile`,
    },
  };

  // console.log(req);
  let data: { [key: string]: any } = await ApiClient.post('/patient', req);
  return { patientId: data['patientId'], userId: data['user']['userId'] };
}
