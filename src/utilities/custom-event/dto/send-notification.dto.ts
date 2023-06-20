import { CustomEvent } from '../definitions';
import { CustomEventOccurred, InfoPayload } from '../interfaces';

export class NotificationDto<T extends CustomEvent> {
  event: T;
  payload: InfoPayload<T>;
  sitecode: string;
  to_user_id: string;
  to_session_id: string;

  constructor(
    eventInfo: CustomEventOccurred<T>,
    sitecode: string,
    toUserOrSession: { toUserId: string } | { toSessionId: string },
  ) {
    this.event = eventInfo.event;

    if ('toUserId' in toUserOrSession)
      this.to_user_id = toUserOrSession.toUserId;
    else this.to_session_id = toUserOrSession.toSessionId;

    this.sitecode = sitecode;

    this.payload = eventInfo.payload;
  }
}
