import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); //test

async function deleteAttendance() {
  console.log('Deleting Records ...');
  await prisma.attendance.deleteMany();
  await prisma.task.deleteMany();
}

deleteAttendance();
