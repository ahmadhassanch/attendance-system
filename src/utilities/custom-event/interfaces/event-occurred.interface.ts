import {
  CustomEvent,
  EventMatchData,
  EventMessageData,
} from '../definitions/events.definitions';

export interface InfoPayload<T extends CustomEvent> {
  title: string;
  body?: string;
  message: EventMessageData[T];
  type: 'info' | 'error' | 'warning' | 'success';
  alarm: boolean;
  isAutoRefresh: boolean;
  duration: number;
}

export interface CustomEventOccurred<T extends CustomEvent> {
  event: T;
  payload: InfoPayload<T>;
  matchData: EventMatchData[T];
}

/**
 * There are 2 types of informations pushed to the user
 * A) Notifications (whenver a user logs in he is registred for these, server will make decision)
 * B) PageRefreshEvents (user registers when comes to a page and deregisters when navigates away)
 * 
 * There are 3 levels to understand PageRefreshEvent
 *
 * 1. How to define a new event -- only admins ;-) 
 *    //STEP 1: DEFINE AN EVENT NAME (in the enum)              (see event.efinitions.ts)
 *    //STEP 2: Define "MESSAGE DATA" for this type of event.   (see event.efinitions.ts)
 *    //STEP 3: Define "MATCH DATA"                             (see event.efinitions.ts)
 *    //STEP 4: Helper function (use any name)                  (see src/events/event.service.ts)
 * 2. How to trigger any of the pre-defined events. FOR BACKEND PROGRAMMERS.
 *     - Method 1. Trigger via helper method:
 *         Users need to know the helper function corresponding to the event, e.g.
 *              RMS_ORDER:          rmsOrderAssigned
 *              ORDERABLE_VALUE:    orderableValueRegistered
 *              ....
 *     - Method 2. Write your own helper method, see below.
 * 3. How to register for PageRefresh. FOR FRONT END PROGRAMMERS.
     
  async rmsOrderAssigned(patientId: string) {
    const orderAssigned: CustomEventOccurred<'RMS_ORDER'> = {
      event: 'RMS_ORDER',
      // matchData: {},
      payload: {
        alarm: false,
        duration: 3000,
        isAutoRefresh: true,
        message: { patientId: patientId, orderableId: orderableId, subType: "ASSIGNED" },
        title: 'Order Assigned',
        type: 'info',
      },
    };

    await this.customEventService.eventOccurred(orderAssigned, this.sitecode);
  }

 */
