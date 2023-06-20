import { Prisma, PrismaClient, RMSSchedule } from '@prisma/client';
import { rmsSchedules } from './data';
const prisma = new PrismaClient();

async function main() {
  let newRmsSchedules: any[] = [];
  let rmsSchedulesToIterate: any[] = [];

  rmsSchedules.forEach((element) => {
    if (element.hasOwnProperty('rmsScheduleId')) {
      rmsSchedulesToIterate.push(element);
    } else {
      newRmsSchedules.push(element);
    }
  });

  let result = await prisma.rMSSchedule.findMany({
    where: {
      rmsScheduleId: {
        in: rmsSchedulesToIterate.map((item) => item.rmsScheduleId),
      },
    },
  });
  // console.log(result);
  let dbSchedules: { [key: string]: RMSSchedule } = {};

  result.forEach((item) => {
    let id: string = item['rmsScheduleId'];
    dbSchedules[id] = item;
  });

  rmsSchedulesToIterate.forEach((item) => {
    if (
      !(
        item.startTime == Number(dbSchedules[item.rmsScheduleId].startTime) &&
        item.endTime == Number(dbSchedules[item.rmsScheduleId].endTime) &&
        item.repeatValue == dbSchedules[item.rmsScheduleId].repeatValue &&
        item.repeatUnit == dbSchedules[item.rmsScheduleId].repeatUnit
      )
    ) {
      newRmsSchedules.push(item);
    }
  });

  console.log(newRmsSchedules);
}
main();
