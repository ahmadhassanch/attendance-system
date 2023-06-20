import { PrismaClient } from '@prisma/client';

import {
  MakeTimedIDUnique,
  unixTimestamp,
} from '../../src/common/common.helper';

export async function seedSettings(prisma: PrismaClient) {
  // Add settings.
  console.log('SETTING default intervals, etc.');
  const setting1 = await prisma.setting.upsert({
    where: { settingName: 'Schedule Interval' },
    create: {
      settingId: MakeTimedIDUnique(),
      settingName: 'Schedule Interval',
      settingJson: JSON.stringify({ unit: 'DAY', value: 60 }),
    },
    update: {
      settingName: 'Schedule Interval',
      settingJson: JSON.stringify({ unit: 'DAY', value: 60 }),
    },
  });

  // Add settings.
  const setting2 = await prisma.setting.upsert({
    where: { settingName: 'Schedule Interval Calculated' },
    create: {
      settingId: MakeTimedIDUnique(),
      settingName: 'Schedule Interval Calculated',
      settingJson: (unixTimestamp() + 3600 * 24 * 60).toString(),
    },
    update: {
      settingName: 'Schedule Interval Calculated',
      settingJson: (unixTimestamp() + 3600 * 24 * 60).toString(),
    },
  });
}
