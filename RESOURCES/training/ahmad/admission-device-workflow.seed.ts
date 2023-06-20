import { PrismaClient } from '@prisma/client';

export async function insertDataForAdmissionDeviceWorkflow() {
  const prisma = new PrismaClient();
  const rmsAdmission = await prisma.rMSAdmission.findFirstOrThrow();
  const rmsOrder = await prisma.rMSOrder.findFirstOrThrow();

  const deviceInventory = await prisma.deviceInventory.findFirstOrThrow({
    select: { deviceInventoryId: true },
    where: { deviceCode: 'A4:C1:38:E8:00:27' },
  });

  await prisma.rMSOrder.update({
    data: {
      rmsAdmissionId: rmsAdmission.rmsAdmissionId,
      orderableId: '5',
      deviceInventoryId: deviceInventory.deviceInventoryId,
    },
    where: { rmsOrderId: rmsOrder.rmsOrderId },
  });

  const rmsOrder_ = await prisma.rMSOrder.findUnique({
    select: {
      orderableId: true,
      orderable: { select: { orderableToResultable: true } },
    },
    where: { rmsOrderId: rmsOrder.rmsOrderId },
  });

  if (!rmsOrder_.orderable.orderableToResultable.length) {
    await prisma.orderableToResultable.update({
      data: { orderableId: rmsOrder_.orderableId },
      where: { orderableToResultableId: '2' },
    });
  }
}

insertDataForAdmissionDeviceWorkflow();
