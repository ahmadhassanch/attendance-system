import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('hello world');
  let result = await prisma.rMSAdmission.findUnique({
    where: {
      rmsAdmissionId: '1bdc5f58-36bc-46cf-a757-eea403e9e628',
    },
    select: {
      admissionDate: true,
      dischargeDate: true,
      rmsOrders: {
        select: {
          rmsOrderId: true,
          rmsAdmissionId: true,
          orderableId: true,
          orderById: true,
          deviceInventoryId: true,
          alertGap: true,
          graceTime: true,
          isDeleted: true,
          rmsSchedules: true,
          orderType: true,
        },
      },
      primaryDoctor: {
        select: {
          user: { select: { firstName: true, lastName: true, fullName: true } },
        },
      },

      isDeleted: false,

      patient: {
        select: {
          user: { select: { firstName: true, lastName: true, fullName: true } },
        },
      },
    },
  });
  console.dir(result, { depth: Infinity });
}
main();
