import { Global, Module } from '@nestjs/common';

import { firebaseApp } from 'src/common/common.helper';
import { SmsService } from './sms/sms.service';
import { CustomEventService } from './custom-event/custom-event.service';
import { EmailService } from './email/email.service';

export const FIREBASE_ADMIN = 'FIREBASE_ADMIN';

@Global()
@Module({
  providers: [
    SmsService,
    EmailService,
    CustomEventService,
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        return firebaseApp;
      },
    },
  ],
  exports: [SmsService, EmailService, CustomEventService, FIREBASE_ADMIN],
})
export class UtilitiesModule {}
