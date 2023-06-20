import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { UserSessionModule } from './user-session/user-session.module';
import { UserCodeModule } from './user-code/user-code.module';
import { UserRoleModule } from './user-role/user-role.module';
import { EmployeeModule } from './employee/employee.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    UserModule,
    UserSessionModule,
    UserCodeModule,
    UserRoleModule,
    EmployeeModule,
    CompanyModule,
  ],
})
export class UsersModule {}
