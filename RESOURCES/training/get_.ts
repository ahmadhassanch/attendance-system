import { Prisma, PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient(); //test
  console.log('hello world');
  let result = await prisma.resultableValue.findMany({});
  console.log(result);
}
main();
