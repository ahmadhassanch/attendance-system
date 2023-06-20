Form and Table mature.
appropriate field highlighting
appropriate filtering.
proper typing
Training
Saudi activate (arabic?), server update/test
Calling probability
Main sprint goals.

{
"title": "title",
"notes": "notes1",
"startDate": 1685127600,
"patientId": "AHSAN-PATIENT-ID",
"endDate": 1685473200,
"startTime": 32400,
"endTime": 32400,
"repeatValue": 1,
"repeatUnit": "DAY",
"reminderUserIds": [
"ALI-D-USER-ID",
"HUMAIRA-N-USER-ID",
"AHSAN-P-USERID-ID"
]
}

## AHMAD

- The escalation will need the recently orderableValueId....
  so need to handle carefully.
- Yet to resove the exception issue in rpm-message service.

- Add places after decimal in backend.
- Messaging
- Get workflows (with permissions) from Bilal liaquat / QA
- What is waleed doing.

- Add a property in resultable for displaying after decimal. - Ahmad

- May be selected icons should be put in app. -- Ahmad
- Translation, Permission
- Flutter/Angular generation.
- Translations (LTR, RTL)
- CGMS
- The app location permission is asked before we have anything assigned.

## BILAL

- Calls integration in Web.
- When a bell is rung -- all CCNurses acting as caregivers.

## SARFRAZ

yarn run:escalation:workflow:small

- src/workflows/message/ ....
- Remove the function
  @ApiOkResponse({ type: String })
  @Get(':id/send-message')
  sendAdmissionMessage(@Param('id') id: string) {
  return this.rPMMessageService.sendAdmissionMessage(id);
  }
- Make it work for Admission, OrderableId,

- Make another endpoint for sending message.

  - Sarfraz idea for picking up subjectusers from subject should be implemented. (message.ts)

- Messaging, escalation.
- Command center is a person who is sitting at all terminals
- ESCALATION/SUBJECTS
  - A general Subject/Group is created when admission is done, add caregivers.
  - A general Subject/Group is created when an Orderable is assigned
    inital message : you have assigned BP. No API call
  - When any resultable of an orderable is out of range, a Nurse can decide to make an ESCALATION.
    Messages will be exchanged between doctor/nurse/guardian(optionally)/patient(optionally), till escalation is closed.
  - Every escalation has a subject, but not every subject is an escalation.

## AHSAN angular

- PHR

## OMAIR & Bilal

- Messages (add file, audio, ...)

- Patient Regitration
- Admission and orderable assignment.
  Doctor, list of patients, select patient, select caregivers.
- File uploads ?? Profile picture, some document which patient wants to show to doctor

## ALI

- Live session??

## USMAN

- Add device (two options, simple field, or by scanning), caregiver/patient role.
- Notification integration
- Fix wrong deviceModelId(44) from API (Device Detail Screen).
- compliance implementation(tasks) for weekly schedule screen. 15min
- Permission handler -- bluetooth, location, etc. 30min

- Sevices on main screen and from go to session. ??
- Audio manager. ??
- IOS device lib(usama)
- IOS calls (usama)
- Screen for specific devices (Temperature, BP, different devices)
- Need icons in app (from backend, update in json).

- Compliance Details Design, 20min
  - Remove assign, taken lables and dates in Taken Tab (only taken date will be shown).
  - Remove taken assign lable from cell in Missed Tab.

## ANUM (Misc)

- Subset of resultables, and patient ranges
  - add table
  - order subset of resutlables (update in workflow) (systolic)
  - when data is received, only subset of resutlabes is added. (systolic)
- Update/update guardian.
- Put a check on end date for compliance for week, so that it can be used for a month also.
- trend line.
- ...logging (kafka).. api times, request, response.
- DATA Protection,

## ABDULLAH (Login/scheduling/notifications)

- RMS - Scheduling, timers, etc.
- Translations
- Permissions.
- Generate dart/angular services for all endpoints.

## DANIYAL (Discrete/Continuous devices, app)

- We still need to add medication workflow
- Translations, Permission,
- Get calls integrated, when/where we need to make database entries.
- Continuous devices - view, database entry, playback. (dart and angular)
- Discrete devices - testing
- iOS app
- Should show value in app when captured, should not wait for server to tell.
- Alarms in app

## USAMA

- why postman can't submit -- bp2 data
- is problem with LHR server, AKU, ???

## AHSAN FLUTTER

- ...

## MAAZ (Live devices)

LOW PRIORITY

- using submodule in git ------------------------ MAAZ / ?
- Cyprus
- full responsive angular, also flutter should run on ipad
- Notification service in node / firebase
- HopeUI exploration
