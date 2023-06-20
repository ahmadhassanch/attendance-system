// import { Prisma, PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function main() {
//   console.log('hello world');
//   let result = await prisma.rMSAdmission.findFirst({
//     where: { patient: { hospitalNo: 'bilalturi_no' } },
//     select: {
//       patient: {
//         select: {
//           hospitalNo: true,
//         },
//       },
//       rmsOrders: {
//         select: {
//           deviceInventoryId: true,
//           orderable: {
//             select: {
//               orderableToResultable: {
//                 select: {
//                   resultable: {
//                     select: {
//                       name: true,
//                       isContinuous: true,
//                       warnHigh: true,
//                       warnLow: true,
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   });
//   console.dir(result, { depth: 10 });
// }

// main();

// type sniffedResultRequest = {
//   deviceInventoryId: string;
//   rmsOrderId?: string;
//   patientId: string;
//   resutlables: [];
// };
