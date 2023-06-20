import { Prisma, PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  console.log('hello world');
  // let result = await prisma.resultableValue.findMany({});

  const item = await prisma.rMSAdmission.findMany({
    select: {
      rmsAdmissionId: true,
      admissionDate: true,
      dischargeDate: true,

      patientId: true,

      dateCreated: true,
      dateUpdated: true,
    },
    where: {
      patientId: 'ac3d668a-0ac6-4cca-80c6-c92c992ebba5',
    },
  });

  console.log(item);
}
main();
