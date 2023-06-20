import { Prisma, PrismaClient } from '@prisma/client';
// import * as mm from './device-data/device_resultables.json';

import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
class VerifyDeviceResultablesDto {
  deviceInventoryId: string;
  orderedResultables: string[];
}

async function verifyDeviceResultables() {
  //   verifyDeviceResultablesDto: VerifyDeviceResultablesDto,
  const prisma = new PrismaClient();
  //   let { deviceInventoryId, orderedResultables } = verifyDeviceResultablesDto;

  let deviceInventoryId = 'GGWIBRXSQQ';
  let orderedResultables = ['12', '13'];

  // get all resultables of this particular device that have been ordered
  const deviceResultables = await prisma.deviceModelToResultable.findMany({
    select: {
      resultableId: true,
      deviceModel: {
        select: {
          devices: {
            select: {
              deviceInventoryId: true,
            },
          },
        },
      },
    },
    where: {
      resultableId: { in: orderedResultables },
      deviceModel: deviceInventoryId
        ? { devices: { some: { deviceInventoryId: deviceInventoryId } } }
        : undefined,
    },
  });
  //   console.dir(deviceResultables, { depth: Infinity });

  // if the resultables ordered are more than those supported by the
  // device in that list
  if (deviceResultables.length < orderedResultables.length) {
    const invalidResultableIds = orderedResultables.filter(
      (resultableId) =>
        !deviceResultables
          .map((item: any) => item.resultableId)
          .includes(resultableId),
    );
    console.log('Invalid', invalidResultableIds);
    const invalidResultables = await prisma.resultable.findMany({
      select: { name: true },
      where: { resultableId: { in: invalidResultableIds } },
    });

    throw new BadRequestException(
      `The following resultables are NOT supported by the assigned device: ${invalidResultables
        .map((it: any) => it.name)
        .join(', ')}.`,
    );
  }
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

async function giveResultables(deviceModelId: string) {
  const prisma = new PrismaClient();

  // get all resultables of this particular device that have been ordered
  const result = await prisma.deviceModelToResultable.findMany({
    select: {
      resultableId: true,
    },
    where: {
      deviceModelId: deviceModelId,
    },
  });
  console.log(result);
}

async function giveResultablesForDeviceModelCount(
  deviceModelId: string,
  resultableArr: string[],
) {
  const prisma = new PrismaClient();

  const result = await prisma.deviceModelToResultable.count({
    where: {
      deviceModelId: deviceModelId,
      resultableId: { in: resultableArr },
    },
  });

  console.log(result);
}

async function giveResultablesForDeviceInventoryIdCount(
  deviceInventoryId: string,
  resultableArr: string[],
) {
  const prisma = new PrismaClient();

  const result = await prisma.deviceModelToResultable.count({
    where: {
      deviceModel: {
        devices: {
          some: { deviceInventoryId: deviceInventoryId },
        },
      },
      resultableId: { in: resultableArr },
    },
  });

  //   const result = await prisma.deviceInventory.findMany({
  //     where: { deviceInventoryId: deviceInventoryId },
  //     select: {
  //       deviceModel: {
  //         select: {
  //           deviceModelToResultable: {
  //             select: {
  //               resultableId: true,
  //             },
  //             where: {
  //               resultableId: { in: resultableArr },
  //             },
  //           },
  //         },
  //       },
  //     },

  //   const result = await prisma.deviceInventory.findMany({
  //     where: {
  //       deviceInventoryId: deviceInventoryId,
  //       deviceModel: {
  //         deviceModelToResultable: {
  //           some: { resultableId: { in: resultableArr } },
  //         },
  //       },
  //     },
  //     // select: {
  //     //   deviceModel: {
  //     //     select: {
  //     //       deviceModelToResultable: {
  //     //         select: {
  //     //           resultableId: true,
  //     //         },
  //     //         where: {
  //     //           resultableId: { in: resultableArr },
  //     //         },
  //     //       },
  //     //     },
  //     //   },

  //     //    resultableId: { in: resultableArr },
  //   });

  console.dir(result, { depth: Infinity });
}

// main3();
async function main() {
  let vdto: VerifyDeviceResultablesDto = new VerifyDeviceResultablesDto();
  //   vdto.deviceInventoryId = 'G6M66U4I22';
  //   vdto.orderedResultables = ['12', '13', '94'];
  let deviceModelId = 'G6M66U4I22';
  let resultables = ['12', '13', '945'];

  await verifyDeviceResultables();

  //   let a = await verifyDeviceResultables(vdto);
  //   let ans = await giveResultables('G6M66U4I22');
  //   let ans = await giveResultablesForDeviceModelCount(
  //     deviceModelId,
  //     resultables,
  //   );

  //   let deviceInventoryId = 'GGWIBRXSQQ'; // 'XCS009QE136447';
  //   let ans3 = await giveResultablesForDeviceInventoryIdCount(
  //     deviceInventoryId,
  //     resultables,
  //   );
}

main();

/*
- Q1. Given `deviceModelId`, which resultables it supports
- Q2. Given `deviceInventoryId`, which resultables it supports
- Q3. Given `deviceModelId` and `resultableId[]`, does this support.

* */
