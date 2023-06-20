import { Prisma, PrismaClient } from '@prisma/client';
// import * as mm from './device-data/device_resultables.json';

async function main() {
  const prisma = new PrismaClient(); // charms-import
  const resultableIds = ['1', '2'];

  const rec = await prisma.deviceModel.findMany({
    select: {
      deviceModelId: true,
      deviceModel: true,
    },
    where: {
      deviceModelToResultable: {
        some: { resultableId: { in: resultableIds } },
      },
    },
  });

  console.log(rec);
  console.log('------------------------------');
}

//Chatgpt
// async function main3() {
//   const resultableIds = ["1", "2"];
//   const devices = await prisma.deviceModel.findMany({
//     where: {
//       DeviceModelToResultable: {
//         some: {
//           resultableId: {
//             in: resultableIds,
//           },
//         },
//       },
//     },

//     select: {
//       deviceModelId: true,
//       deviceModel: true,
//     },
//   });

//   console.log(devices);
// }

// main3();
main();
