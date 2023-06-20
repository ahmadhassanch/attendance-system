import { PrismaClient } from '@prisma/client';

export async function main() {
  const prisma = new PrismaClient(); // fake-data

  //   await prisma.userMessage.deleteMany();
  //   await prisma.userSubject.deleteMany();
  //   await prisma.rPMMessage.deleteMany();
  //   await prisma.rPMSubject.deleteMany();
  //   await prisma.resultableValue.deleteMany();
  //   await prisma.orderableValue.deleteMany();
  await prisma.rMSScheduleInstance.deleteMany();
  await prisma.rMSSchedule.deleteMany();
  await prisma.rMSOrderToResultable.deleteMany();
  await prisma.rMSOrder.deleteMany();
  //   await prisma.rMSAdmissionCaregiver.deleteMany();
  //   await prisma.allergyToPatient.deleteMany();
  //   await prisma.deviceInventoryHistory.deleteMany();
  //   await prisma.rMSAdmission.deleteMany();

  //   await prisma.patientResultableRange.deleteMany();
  //   await prisma.deviceInventory.deleteMany();
  //   await prisma.deviceModelToResultable.deleteMany();
  //   await prisma.patient.deleteMany();
  //   await prisma.medication.deleteMany();
  //   await prisma.deviceModel.deleteMany();
  //   await prisma.orderableToResultable.deleteMany();
  //   await prisma.employee.deleteMany();
  //   await prisma.userRole.deleteMany();
  //   await prisma.guardian.deleteMany();
  //   await prisma.userSetting.deleteMany();
  //   await prisma.userCode.deleteMany();
  //   await prisma.userSession.deleteMany();
  //   await prisma.allergy.deleteMany();
  //   await prisma.dosageForm.deleteMany();
  //   await prisma.dosageUnit.deleteMany();
  //   await prisma.medicationRoute.deleteMany();
  //   await prisma.dummyModel.deleteMany();
  //   await prisma.deviceType.deleteMany();
  //   await prisma.manufacturer.deleteMany();
  //   await prisma.resultable.deleteMany();
  //   await prisma.orderable.deleteMany();
  //   await prisma.specialty.deleteMany();
  //   await prisma.setting.deleteMany();
  //   await prisma.user.deleteMany();
}

main();
