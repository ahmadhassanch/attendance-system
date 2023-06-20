- ONLY ONE NOTIFICATION PER SCHEDULE.

ANUM / USMAN

# Usama.- Patient Progress Report??

- ANUM will do the frontend, and Usman will test.
- Remove button "Create Admission"
- On Pressing Discharge(in PHR, or here), just ask (are you sure)
- Open from PHR directly,
  - Patient field, date prefilled in left panel.
  - ordered by should be a dropdown.
  - add more caregivers.
- Two sections

  - Orderables, Medications
  - Appropriate view for Medication
    - dropdown of medication, quantity, also show units from dosage unit

- Change `Start Time` to `Start Date`. Same with end-date
- Fix Normal Ranges on clicking a button on resultable, open normal ranges.
- None of the normal ranges should be empty
- Remove alert gap ()
- GRACE TIME IN MINUTS. `Grace Time (minutes)`.
- MAKE SURE: only one admission is active at a time.
- optional Can go to Admission from PatientList, Add admittedColumn in PatientList (LP)
- On clicking the device field, the dialog should open. remove search button.

# Usama Waleed and Daniyal

Calls Usama, Web(Waleed), Daniyal (mobile), )

- Web/DApp should be able to call the patient from PHR. (audio/video)
- Patient should be able to call command center.,
- Master tab function should be working
- One command center picks call, other calling should be stopped.
- Web/DApp should be able to invite another doctor to call
- Screen sharing (Web-Dapp,Papp) (....)

# Faraz

- Medical History (Admission, Orderable, Medications, Escalation, ...)

Usama.

- Patient Progress Report??

MONDAY PLAN:

- Admission Screen. (Anum, Abdullah - support, Usman)
- Data Submission Discrete (Daniyal, Abdullah, AhsanA web, Usman/AhsanF App)
  - Data submission from device/manual and attachment to schedule.
  - Detail Schedule - multiple days calendar view.
  - Detail orderable schedule
    - video tutorial
    - instructions
    - manual submission.
- Calls Web(Waleed), Daniyal (mobile), Usama Lead
- Escalation Sarfraz (App Omair, Web Ahsan Ahmed):
  - On Admission (Generic)
  - On Orderable Assignment/change
  - On Escalation (Only one Escalation of an orderable at a time)
  - Subject and Subject detail screens.
  - Escalation status management (escalated, responded, closed)
  - Appropriate notifications.
  - Copy to patient
  - Escalated to? (Drop down of doctors).
- Event Logs, Billable Event (Ahmad)
  - Word document of Event logs
  - Columns:
    - Event Time, Patient Name & Reg, Patient Type, Orderable/ Caller Event, Call Start/Schedule time, Call end / Reading time
- Master Settings (Ahmad, Ahsan, _Maaz_)
- ANUM to fix registration module. (reduce fields etc.) demo.
  - Add Patient type (Chronic, Remote Monitoring)
- Hippa Compliance (Need discussion with Faraz)
- System training (Ahmad sb -> Faraz, Waleed and Usama)

- Master Setting:

  - Ahmad (BE), AhsanA (Webapp)
  - Orderables/Resultables
  - Manufacturers
  - Medications (Dosage Forms, Dosage Units, Routes)
  - Diagnoses (ICD10 Codes, no FE)
  - LOW PRIORITY:
  - Allergies \*
  - Titles, Occupations*, Cities*, Religions, Ethnicities
  - Devices (Manf, Type, Model, Inventory)
  - Languages LP
  - Clinical Questions LP

- Patient/Employee/Guardian:

  - BE (Anum), WebApp (Ahsan)
  - System Administrations
  - Command Center, Nurse, Doctor, Patient
  - TODO:
    - Remove extra fields ()
    - Keep only (phone number,.....) BILAL
    - LP: Guardian fix (can add and remove multiple)

- PApp/DApp Drawer:

  - Profile - adjust fields (SEE ABOVE KEEP ONLY)
  - Settings,
  - Reminder Notifications
  - Voice Over
  - Change Languages
  - Change Password
  - Change Theme

- Authentication:
  - BE Abdullah, PApp (Usman), DApp(Ahsan)
  - Login
  - Logout
  - Forgot Password
  - I'm new User
  - REMAINING:
    - SMS Service Twilio
- Admission/Orderable/Schedule: - MOST IMPORTANT

  - Anum (BE), Anum (FE)
  - Notification/Alarms (Abdullah)
  - Papp - Dashboard/weekly schedule - Usman

- Data Submission (Discrete): - MOST IMPORTANT

  - Manual Entry
  - Device Entry (compliant / noncompliant)
  - Show in WebApp(Ahsan), Papp (Usman), Dapp(AhsanA)
  - Notification (Abdullah)
  - Mark Invalid
  - Message to Patient

- Data Submission (Live):

  - Daniyal (..)
  - FE (Waleed), DApp (Daniyal)
  - Multiple Patients sessions view

- Escalation / Messages/ Calls:

  - Sarfraz (BE Escalation), Usman (Calls)
  - Text, Audio, Image
  - Waleed (webapp - Messaging/esclations)
  - PApp, Dapp
  - Recordings

- PHR:

  - View of all above, certain reports, graphs
  - Ahsan (FE), Anum (BE), PApp(Usman), DApp(AhsanA)
  - ECG Tab
  - Compliance
  - Active Med/Orderables
  - WebDashboard,
  - Flowsheet
  - Call Recording
  - Escalations

- Reports:

  - FE/BE Faraz
  - Events Logs
  - Billable events report

- Hippa Compliance:

  - Audit Logs

- Providers Portal: Where Provider enter Patient's details

---

- Workflows: Patient App - Usman

  - Authentication: Sprint 69 completed sms-code left
    - Login
    - Logout
    - Forgot Password
    - I'm new User
  - Main Screen: Sprint 69 - 70
    - Today: Sprint 69 -
      - Todays Plan:
        - See All:
          - Detail Schedules Screen:
        - Upcoming:
          - Schedule:
            - Detail Screen of Medicine Schedule
            - Detail Screen of Orderble Schedule:
              - Watch Video
              - Go To Session: (if Continuous)
                - Device continuous screen.
              - Add Manual:
                - Add Reading Manually.
        - Completed:
          - Detail result screen.
      - Device Status:
    - PHR: Sprint 69
      - Date Range filter
      - Compliance:
        - Medication Compliance:
          - Medicine wise Compliance:
            - Each Medicine wise detail Screen:
              - Taken
              - Missed
        - Orderable Compliance:
          - Orderable wise Compliance:
            - Each Orderable wise detail Screen:
              - Taken
              - Missed
        - Orderables Graphs:
        - ECG Tab:
          - Show All ECGs
    - Call Screen: Sprint 69
      - Calls Library Integration:
      - Calls list
      - Call Main Screen
    - Chat: Sprint 70 - 50%
      - Text
      - Attachments
      - Voice Notes
  - Drawer: Sprint 69 - completed

    - Profile:
      - See Profile
      - Edit Profile
    - Settings:
      - Reminder Notification:
        - On
        - Off
      - Voice Over:
        - On
        - Off
    - About:
      - About us content
    - Add Reading:
      - Orderables List:
        - Each Orderables Manual Data Screen
    - Logout

  - Device Library: Sprint 70 - completed
    - Discrete Devices: Sprint 70
    - Continuous Devices:
  - Calls Library: Sprint 70 - pending
  - Notifications: Sprint 70 - 50%
  - Live Refreshes: Sprint 70 -

- Workflows: Caregiver App - Ahsan Farooq
  - Authentication:
    - Login
    - Logout
    - Forgot Password
    - I'm new User
  - Main Screen:
    - Observations:
      - Filters:
      - Live sessions:
        - Detail Screen of Live Session
      - Escalation:
        - Detail Escalation
        - Audio recording
        - Attach file
    - Patients:
      - PHR:
        - Complaice:
        - Active Medication
        - Active Orderables
        - ECG Graphs
        - Other Orderable Graphs
    - Call:
      - Calls List
      - Calls Screen
        - Add patient
        - Add Employee
    - Chat:
      - Subjects:
        - Escalated:
          - Detail Screen:
            - Send Messages
            - Voice note
            - send attachment - pic - doc etc.
        - Closed:
    - Drawer:
      - Profile
      - Settings:
        - Change Languages
        - Change Password
        - Change Theme
      - About
- Workflows: Web Portal
  - Modules:
    - Settings:
      - Master Settings:
        - Patient Sponsors:
        - Manufacturers\*
        - Medications\*
        - Dosage Forms
        - Dosage Units
        - Medication Routes
        - Orderables
        - Resultables:
        - Allergies
        - Orderable Categories
        - Titles
        - Occupations\*
        - Cities\*
        - Religions
        - Ethnicities
        - Languages
        - System Languages
        - Clinical Questions\*
      - Device Configuration:
        - Manufacturer
        - Device Types
        - Device Models
      - Roles and Permissions:
        - System Administrations
        - Command Center
    - Command Center:
      - Observations:
        - Observations:
          - Observations Cards
          - Detail Observation Card:
            - View PHR
            - Escalate
            - Mark Close
            - Message to Patient
            - Mark Invalid
        - Home Admissions:
        - Ongoing Live Sessions:
          - Multiple Patients sessions view
        - Messages:
          - Attach document
          - Attach voice note.
        - Recording:
        - Patient App Monitoring:
      - Employees:
        - Employees List
        - Add New Employee
      - Patients:
        - Patients List
        - Add New Patient
        - PHR:
          - Diagnoses
          - Allergies
          - Dashboard
          - Flowsheet
          - Escalations
          - Continuous Graphs
          - Call Recordings
      - Device Inventory:
        - Device List
        - Add New Device
      - Reports:
        - Events Logs
        - Billable events report
      - Hippa Compliance:
        - Audit Logs
      - Roles and Permissions:
        - Patient
        - Command Center
        - Nurse
        - Caregiver
      - SMS Service Twilio:
      - Providers Portal: Where Provider enter Patient's details
      - ICD10 Codes:
      - Calls:
