import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('hello world');
  //   let result = await prisma.orderableValue.findMany({});
  //   console.dir(result, { depth: 10 });

  //   const result = await prisma.orderableValue.groupBy({
  //     by: ['orderableId'],
  //     orderBy: {

  //         orderableValueId: 'desc',

  //     },
  //   });
  // }

  //   const groupBy = await prisma.orderableValue.groupBy({
  //     by: ['readingTime', 'orderableId', 'patientId'],
  //     //   _sum: {
  //     //     readingTime: true,
  //     //   },
  //     orderBy: {
  //       readingTime: 'desc',
  //     },
  //     //   skip: 2,
  //     // take: 1,
  //   });

  //   const result = await prisma.orderableValue.groupBy({
  //     by: ['orderableId', 'readingTime'],
  //     orderBy: [{ orderableId: 'desc' }],
  //     distinct: "orderableId",
  //   });
  // const result = await prisma.orderableValue.findMany({
  //   where: {
  //     orderableId: {
  //       in: await prisma.orderableValue
  //         .groupBy({
  //           by: ['orderableId', 'readingTime'],
  //           orderBy: [{ readingTime: 'desc' }],
  //           take: 1,
  //           ,
  //         })
  //         .then((groups) => groups.map((group) => group.orderableId)),
  //     },
  //   },
  //   orderBy: [{ orderableId: 'asc' }, { readingTime: 'desc' }],
  // });

  const result = await prisma.orderableValue.findMany({
    distinct: ['deviceInventoryId', 'orderableId'],
    orderBy: {
      readingTime: 'desc',
    },
    where: {
      patientId: '6eb57c51-ef4c-4b6a-8fa1-0c88d63ebc36',
    },
    select: {
      deviceInventory: {
        select: {
          deviceModel: {
            select: {
              deviceModel: true,
            },
          },
        },
      },
      orderableId: true,
      readingTime: true,
      orderable: { select: { name: true } },
      patient: {
        select: {
          patientId: true,
        },
      },
    },
  });

  let newDict = {
    deviceModel: result[0].deviceInventory.deviceModel.deviceModel,
    readingTime: result[0].readingTime,
    orderable: result[0].orderable.name,
  };

  console.dir(result, { depth: 3 });
}
main();
// by: ['orderableId'],
//   orderBy: [{ readingTime: 'desc' }],
//   take: 1,

// type sniffedResultRequest = {
//   deviceInventoryId: string;
//   rmsOrderId?: string;
//   patientId: string;
//   resutlables: [];
// };
