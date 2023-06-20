import { ApiClient } from '../lib/api-client';
// import { RMSSchedule } from "@prisma/client";
// import {Prisma} from "@prisma/client";
function createOrderItems(orderableIds: string[], startTime: number) {
  return orderableIds.map((orderableId) => {
    return {
      // orderableId,
      // alertGap: 101,
      // orderableInstructions: "Random",
      // graceTime: 0,
      // startTime,
      // repeatDelta: "DAY",
      // repeatAfter: 1,
      // frequency: 10,
      // nextStartTime: 0,
    };
  });
}

export async function createRmsOrder(
  rmsAdmissionId: string,
  patientId: string,
  orderById: string,
  orderableId: string,
  deviceId: string,
  schedules: any[],
  orderedResultables: string[],
  medicationId?: string,
  medicationQuantity?: number,
) {
  let req = {
    rmsAdmissionId: rmsAdmissionId,
    patientId: patientId,
    orderableId: orderableId,
    orderType: 'DAILY',
    orderById: orderById,
    // alertGap: 10,
    // graceTime: 30,
    deviceInventoryId: deviceId,
    rmsSchedules: schedules,
    orderedResultables: orderedResultables,
    medicationId: medicationId,
    medicationQuantity: medicationQuantity,
  };

  // console.log('<<<<<<<<<<<<', req);
  let data: { [key: string]: any } = await ApiClient.post(
    '/scheduling/create-order',
    req,
  );
  // console.log(data);
  return data;
}

export async function updateRmsOrder(rmsOrderId: string, schedules: any[]) {
  let req: { [key: string]: any } = {
    rmsSchedules: schedules,
    orderedResultables: [],
  };
  let data: { [key: string]: any } = await ApiClient.patch(
    `/scheduling/update-order/${rmsOrderId}`,
    req,
  );
  // console.log(data);
}
