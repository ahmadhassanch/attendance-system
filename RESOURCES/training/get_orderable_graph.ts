import { Prisma, PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  console.log('hello world');
  let result = await prisma.resultableValue.findMany({
    select: {
      numericValue: true,
    },
    where: {
      orderableValue: {
        orderableId: 'GGBJIK2QRF',
        patientId: 'c608bd8d-f8eb-4c05-b379-bf3aa00af6a3',
        acquisitionTime: { equals: 212887047576018 },
      },
    },
  });

  //   let result = await prisma.orderableValue.findMany({
  //     select: {
  //       resultableValues: { select: { numericValue: true } },
  //     },
  //     where: {
  //       orderableId: 'GGBJIK2QRF',
  //       patientId: 'c608bd8d-f8eb-4c05-b379-bf3aa00af6a3',
  //       acquisitionTime: { equals: 212887047576018 },
  //     },
  //   });

  console.dir(result, { depth: 3 });
}
main();

//212887047576018

// patient id c608bd8d-f8eb-4c05-b379-bf3aa00af6a3

// -- orderable ID - GGBJIK2QRF
