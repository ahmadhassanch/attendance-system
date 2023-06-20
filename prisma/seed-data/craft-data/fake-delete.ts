import { PrismaClient } from '@prisma/client';

export async function main() {

  const prisma = new PrismaClient();

  await prisma.attendance.deleteMany();
  await prisma.task.deleteMany();
  await prisma.company.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.userSetting.deleteMany();
  await prisma.userCode.deleteMany();
  await prisma.userSession.deleteMany();
  await prisma.recordType.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.user.deleteMany();
  }
main();