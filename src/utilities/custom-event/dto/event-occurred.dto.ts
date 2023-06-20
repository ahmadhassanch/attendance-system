import { CustomEvent, EventMatchData } from '../definitions/events.definitions';
import { CustomEventOccurred, InfoPayload } from '../interfaces';

export class CustomEventOccurredDto<T extends CustomEvent> {
  event: T;
  payload: InfoPayload<T>;
  match_data: EventMatchData[T];
  sitecode: string;

  constructor(eventInfo: CustomEventOccurred<T>, sitecode: string) {
    this.event = eventInfo.event;
    this.match_data = eventInfo.matchData;
    this.sitecode = sitecode;

    this.payload = eventInfo.payload;
  }
}
