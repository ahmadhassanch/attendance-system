# Events, Notifications, and Messages

- Every event triggers a notification. So, they can be used interchangably, 1-1 correspondence
- Every message will also result in a notification, but not every notification will post an entry in messages.

# Event/Notification Types

Based on type of notfication, and the screen being viewed by the user, appropriate actions will take place.
We are going to give examples how the frontend (MobileApps, WebApps), should handle them.

## RMS_ORDER (assigned, unassiged, edited)

- Result in the device library refresh
- Relevant page refresh
  - For example, if a patient is on dashboard (showing today's compliance, upcoming, taken), he will need
    to refresh the page.

## ORDERABE_VALUE (added, due)

## ESCALATION (started, message, closed)

## APPOINTMENT_BOOKED
