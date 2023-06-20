import { Module } from '@nestjs/common';

import { SettingModule } from './setting/setting.module';
import { UserSettingModule } from './user-setting/user-setting.module';
import { TaskModule } from './task/task.module';
import { RecordTypeModule } from './record-type/record-type.module';
import { AttendanceModule } from './attendance/attendance.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SettingModule,
    UserSettingModule,
    TaskModule,
    RecordTypeModule,
    AttendanceModule,
    UsersModule,
  ],
})
export class ModulesModule {}
