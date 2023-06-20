import { Inject, Injectable } from '@nestjs/common';

import {
  BatchResponse,
  Messaging,
  MessagingTopicManagementResponse,
  MulticastMessage,
} from 'firebase-admin/messaging';

import { CustomEvent } from './definitions/events.definitions';
import { CommonService } from 'src/common/common.service';
import { CustomEventOccurred } from './interfaces';
import { CustomEventOccurredDto, NotificationDto } from './dto';

@Injectable()
export class CustomEventService {
  constructor(
    private readonly commonService: CommonService,
    @Inject('FIREBASE_ADMIN') private readonly firebaseMessaging: Messaging,
  ) {}

  async eventOccurred<T extends CustomEvent>(
    eventInformation: CustomEventOccurred<T>,
    sitecode: string,
  ) {
    const eventOccurredDto = new CustomEventOccurredDto(
      eventInformation,
      sitecode,
    );

    return await this.commonService.postNotificationServer(
      '/private/broker/EventOccurred',
      eventOccurredDto,
    );
  }

  async sendDirectNotification<T extends CustomEvent>(
    notifInfo: CustomEventOccurred<T>,
    sitecode: string,
    toUserOrSession: { toUserId: string } | { toSessionId: string },
  ) {
    const notifDto: NotificationDto<T> = new NotificationDto(
      notifInfo,
      sitecode,
      toUserOrSession,
    );

    return await this.commonService.postNotificationServer(
      '/private/broker/SendNotification',
      notifDto,
    );
  }

  async sendDirectNotificationV2<T extends CustomEvent>(
    notifInfo: CustomEventOccurred<T>,
    fcmTokens: string[],
  ): Promise<BatchResponse> {
    const message: MulticastMessage = {
      // notification: {
      //   body: notifInfo.payload.body ?? notifInfo.payload.title,
      //   title: notifInfo.payload.title,
      // },
      // webpush: {
      //   notification: {
      //     body: notifInfo.payload.body ?? notifInfo.payload.title,
      //     title: notifInfo.payload.title,
      //     icon: '/assets/images/logo-small.png',
      //   },
      // },
      tokens: fcmTokens,
      data: {
        body: notifInfo.payload.body ?? notifInfo.payload.title,
        title: notifInfo.payload.title,
        icon: '/assets/images/logo-small.png',
        data: JSON.stringify(notifInfo),
      }, //notifInfo as { [key: string]: any },
    };

    console.log(message);

    try {
      const response = await this.firebaseMessaging.sendEachForMulticast(
        message,
      );
      console.log('Successfully sent message:', response);
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      return error;
    }
  }
}
