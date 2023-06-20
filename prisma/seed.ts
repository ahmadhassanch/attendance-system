import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seeding-helpers/users.seed';
import { seedSettings } from './seeding-helpers/settings.seed';
// import { seedCharmsData } from '../RESOURCES/CHARMS/seed-charms-data/seed-charms-data';

async function main() {
  const prisma = new PrismaClient();
  console.log('\n ....  Seeding Medication Ord/Res, Settings, Users ....');

  // seedSettings(prisma);
  // seedCharmsData(prisma);
  seedUsers(prisma);

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    // await prisma.$disconnect(); // Made an local variable, moved to end of main()
  });
