import { Prisma, PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
const prisma = new PrismaClient({
  log: ['query'],
});
async function main() {
  console.log('hello world');
  //   const result =
  //     await prisma.$queryRaw`SELECT category, MONTH(date), YEAR(date), MIN(amount), MAX(amount), AVG(amount) FROM Expense WHERE date >= '2020-01-01' AND date <= '2030-12-31' GROUP BY category, MONTH(date), YEAR(date);`;

  //   const result = await prisma.$queryRaw`
  // select sum(numericValue), day(from_unixtime(dateCreated)) from ResultableValue group by day(from_unixtime(dateCreated)) limit 5;
  //   console.dir(result, { depth: Infinity });`;
  const result = await prisma.resultableValue.findMany({
    where: {
      resultableId: '1',
    },
    select: {
      numericValue: true,
      resultable: { select: { name: true } },
      orderableValue: { select: { acquisitionTime: true } },
    },
  });
  console.dir(result, { depth: Infinity });
}
main();

// SELECT category, MONTH(date), YEAR(date), MIN(amount), MAX(amount), AVG(amount) FROM Expense WHERE date >= '2020-01-01' AND date <= '2030-12-31' GROUP BY category, MONTH(date), YEAR(date) HAVING category = 'Travel';

// select sum(orderableId), day(from_unixtime(dateCreated)) from Orderable group by day(from_unixtime(dateCreated)) limit 5;
