import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';

import { EnvironmentVars } from 'src/common/common.types';
// import { AuditLogsService } from 'src/workflows/logs/audit-logs/audit-logs.service';
import { UserSessionModule } from 'src/modules/users/user-session/user-session.module';
import { UserSessionService } from 'src/modules/users/user-session/user-session.service';

@Module({
  providers: [AuthService, JwtStrategy, UserSessionService],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(EnvironmentVars.JWT_SECRET),
        signOptions: { expiresIn: '86400s' },
      }),
    }),
    UserSessionModule,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
