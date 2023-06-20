import { PrismaClient } from '@prisma/client';

import {
  MakeTimedIDUnique,
  datesForCreate,
} from '../../src/common/common.helper';
import { RoleType } from '../../src/common/common.types';

const md5 = require('md5');

// async function addPatientAhsan(
//   prisma: PrismaClient,
//   userSetting: {
//     create: {
//       userSettingId: string;
//       userSettingJson: string;
//     };
//   },
// ) {
//   userSetting.create.userSettingId = MakeTimedIDUnique();
//   const ahsanPatient = await prisma.patient.create({
//     data: {
//       patientId: 'AHSAN-PATIENT-ID',
//       fatherName: 'Muhammad Zahid Farooq',
//       hospitalNo: 'CHI-001',
//       externalHn: 'HNO-001',
//       isDemoPatient: false,
//       user: {
//         create: {
//           userId: 'AHSAN-P-USERID-ID',
//           username: 'ahsanp',
//           password: md5('Ahsan@1'),
//           firstName: 'Ahsan',
//           title: 'Mr',
//           lastName: 'Farooq',
//           fullName: 'Ahsan Farooq',
//           // roleType: 'PATIENT',
//           gender: 'MALE',
//           birthDate: 863654400,
//           // height: 174,
//           email: 'ahsan@cognitivehealthintl.com',
//           mobile: '4321',
//           nic: '3740564338085',
//           isActivated: true,
//           emailVerified: false,
//           phoneVerified: true,
//           useTwoFactor: false,
//           isDeleted: false,
//           ...datesForCreate(),
//           userSetting,
//           roles: {
//             createMany: {
//               data: [
//                 {
//                   userRoleId: MakeTimedIDUnique(),
//                   role: RoleType.PATIENT,
//                 },
//               ],
//             },
//           },
//         },
//       },
//     },
//   });
// }

// async function addPatientDaniyal(
//   prisma: PrismaClient,
//   userSetting: {
//     create: {
//       userSettingId: string;
//       userSettingJson: string;
//     };
//   },
// ) {
//   userSetting.create.userSettingId = MakeTimedIDUnique();

// }

async function addaliDoctor(
  prisma: PrismaClient,
  userSetting: {
    create: {
      userSettingId: string;
      userSettingJson: string;
    };
  },
) {
  userSetting.create.userSettingId = MakeTimedIDUnique();

  const omairDoctor = await prisma.employee.create({
    data: {
      employeeId: 'ALI-DOCTOR-ID',
      employeeNo: 'Ali-001',
      dateCreated: 1680061487,
      dateUpdated: 1680061487,
      user: {
        create: {
          userId: 'ALI-D-USER-ID',
          username: 'alid',
          password: md5('Ali@1'),
          firstName: 'Ali',
          title: 'Mr',
          lastName: 'Hassan',
          fullName: 'Ali Hassan',
          // roleType: 'DOCTOR',
          gender: 'MALE',
          birthDate: 863654400,
          // height: 174,
          email: 'ali@cognitivehealthintl.com',
          mobile: '929998465067',
          nic: '37405688338083',
          isActivated: true,
          emailVerified: false,
          phoneVerified: true,
          useTwoFactor: false,
          isDeleted: false,
          ...datesForCreate(),
          userSetting,
          roles: {
            createMany: {
              data: [
                {
                  userRoleId: MakeTimedIDUnique(),
                  role: RoleType.PHYSICIAN,
                },
              ],
            },
          },
        },
      },
    },
  });
}

async function addOmairDoctor(
  prisma: PrismaClient,
  userSetting: {
    create: {
      userSettingId: string;
      userSettingJson: string;
    };
  },
) {
  userSetting.create.userSettingId = MakeTimedIDUnique();

  const omairDoctor = await prisma.employee.create({
    data: {
      employeeId: 'UMAIR-DOCTOR-ID',
      employeeNo: 'Omair-001',
      dateCreated: 1680061487,
      dateUpdated: 1680061487,
      user: {
        create: {
          userId: 'UMAIR-D-USER-ID',
          username: 'omaird',
          password: md5('Omair@1'),
          firstName: 'Omair',
          title: 'Mr',
          lastName: 'Yousaf',
          fullName: 'Omair Yousaf',
          // roleType: 'DOCTOR',
          gender: 'MALE',
          birthDate: 863654400,
          // height: 174,
          email: 'OMAIR@cognitivehealthintl.com',
          mobile: '923338465067',
          nic: '3740564338083',
          isActivated: true,
          emailVerified: false,
          phoneVerified: true,
          useTwoFactor: false,
          isDeleted: false,
          ...datesForCreate(),
          userSetting,
          roles: {
            createMany: {
              data: [
                {
                  userRoleId: MakeTimedIDUnique(),
                  role: RoleType.PHYSICIAN,
                },
              ],
            },
          },
        },
      },
    },
  });
}

async function addHumairaNurse(
  prisma: PrismaClient,
  userSetting: {
    create: {
      userSettingId: string;
      userSettingJson: string;
    };
  },
) {
  userSetting.create.userSettingId = MakeTimedIDUnique();

  const humairaNurse = await prisma.employee.create({
    data: {
      employeeId: 'HUMAIRA-NURSE-ID',
      employeeNo: 'Humaira-001',
      dateCreated: 1680061487,
      dateUpdated: 1680061487,
      user: {
        create: {
          userId: 'HUMAIRA-N-USER-ID',
          username: 'humairan',
          password: md5('Humaira@1'),
          firstName: 'Humaira',
          title: 'Miss',
          lastName: 'Khan',
          fullName: 'Humaira Khan',
          // roleType: 'NURSE',
          gender: 'FEMALE',
          birthDate: 863654400,
          // height: 174,
          email: 'humaira@cognitivehealthintl.com',
          mobile: '924448465067',
          nic: '3740534338083',
          isActivated: true,
          emailVerified: false,
          phoneVerified: true,
          useTwoFactor: false,
          isDeleted: false,
          ...datesForCreate(),
          userSetting,
          roles: {
            createMany: {
              data: [
                {
                  userRoleId: MakeTimedIDUnique(),
                  role: RoleType.REGULAR_NURSE,
                },
              ],
            },
          },
        },
      },
    },
  });
}

export async function addSuperAdmin(
  prisma: PrismaClient,
  userSetting: {
    create: {
      userSettingId: string;
      userSettingJson: string;
    };
  },
) {
  userSetting.create.userSettingId = MakeTimedIDUnique();

  const post1 = await prisma.user.upsert({
    where: { email: 'testing@gmail.com' },
    update: {
      email: 'testing@gmail.com',
      username: 'ahmad',
      password: md5('Testing@1'),
      userId: '000-000',
    },
    create: {
      email: 'testing@gmail.com',
      username: 'ahmad',
      password: md5('Testing@1'),
      userId: '000-000',
      firstName: 'firstname',
      fullName: 'firstname',
      mobile: '090078601',
      phoneVerified: true,
      ...datesForCreate(),
      userSetting,
      roles: {
        createMany: {
          data: [
            {
              userRoleId: MakeTimedIDUnique(),
              role: RoleType.SUPERADMIN,
            },
          ],
        },
      },
    },
  });
}

async function createCompanies(prisma: PrismaClient) {
  await prisma.company.create({
    data: {
      companyId: 'MOBILINK',
      name: 'JAZZ COMPANY',
      phone: '987654321',
      email: 'facility1@email.com',
      address: 'House 1, Street 1',
      city: 'Islamabad',
      pocId: 'HUMAIRA-NURSE-ID',
      settings: JSON.stringify({}),
      ...datesForCreate(),
    },
  });

  await prisma.company.create({
    data: {
      companyId: 'SHELL_PAKISTAN',
      name: 'Shell Oil Company',
      phone: '123456789',
      email: 'facility2@email.com',
      address: 'House 2, Street 2',
      city: 'Lahore',
      pocId: 'UMAIR-DOCTOR-ID',
      settings: JSON.stringify({}),
      ...datesForCreate(),
    },
  });
}

export async function seedUsers(prisma: PrismaClient) {
  console.log(
    'SEED USERS: SUPERADMIN, PATIENT-AHSAN, OMAIR-DOCTOR, HUMAIRA-NURSE, ALI-DOCTOR ...',
  );

  const userSettingJson = {
    units: {
      temperature: 'C',
      weight: 'kg',
    },
  };

  const userSetting = {
    create: {
      userSettingId: MakeTimedIDUnique(),
      userSettingJson: JSON.stringify(userSettingJson),
    },
  };

  await addSuperAdmin(prisma, userSetting);
  // await addPatientAhsan(prisma, userSetting);
  // await addPatientDaniyal(prisma, userSetting);
  await addOmairDoctor(prisma, userSetting);

  await addHumairaNurse(prisma, userSetting);
  await addaliDoctor(prisma, userSetting);

  await createCompanies(prisma);
}
