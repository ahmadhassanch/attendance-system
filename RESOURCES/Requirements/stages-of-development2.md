## Less Important Tables

- UserSession
- UserCode
- RMSAdmissionCaregiver
- Specialty
- OrderableToResultable
- DeviceModelToResultable
- DeviceInventoryToResultable
- Manufacturer
- DeviceType
- RMSAdmissionDoctor
- PatientResultableRange

## Complete

```mermaid
graph TD;

classDef blue fill:#00f
classDef red fill:#a30
classDef green fill:#0f0

Orderable:::blue
Resultable:::blue
OrderableValue:::red
ResultableValue:::red
Patient:::red
Employee:::red
Subject:::red

  User-->Guardian
  User-->Patient
  Guardian-.->Patient
  User-->Employee
  Orderable-->OrderableValue
  RMSScheduleInstance-.->OrderableValue
  Patient-->OrderableValue
  DeviceInventory-.->OrderableValue
  OrderableValue-->ResultableValue
  Resultable-->ResultableValue
  Employee-->RMSAdmission
  Patient-->RMSAdmission
  RMSAdmission-->RMSOrder
  Orderable-->RMSOrder
  Employee-->RMSOrder
  DeviceInventory-.->RMSOrder
  RMSOrder-->RMSSchedule
  RMSSchedule-->RMSScheduleInstance
  OrderableValue-.->Subject
  RMSOrder-.->Subject
  User-->Subject
  Subject-->Message
  User-.->Message
  User-->Message
  User-->SubjectUser
  Subject-->SubjectUser
  Message-->MessageStatus
  User-->MessageStatus
  DeviceModel-->DeviceInventory
  DeviceInventory-->DeviceInventoryHistory
```

## Complete Diagram with All Tables

```mermaid

flowchart TD
classDef blue fill:#00f
classDef red fill:#a30
classDef green fill:#0f0
 User --->UserSession
   User --->UserCode
   User --->Guardian
   User --->Patient
   Guardian --->Patient
   Specialty --->Employee
   User --->Employee
   User --->MessageStatus
   Patient --->OrderableValue
   Patient --->PatientResultableRange
   Employee --->RMSAdmission
   Patient --->RMSAdmission
   Employee --->RMSAdmissionDoctor
   Employee --->RMSOrder
   User --->Subject
   User --->Message
   User --->Message
   User --->SubjectUser

   Message --->MessageStatus
   User --->MessageStatus

   Orderable --->OrderableToResultable
   Resultable --->OrderableToResultable
   Orderable --->OrderableValue
   OrderableValue --->ResultableValue
   Resultable --->ResultableValue
   Resultable --->PatientResultableRange
   RMSScheduleInstance --->OrderableValue
   Patient --->OrderableValue
   DeviceInventory --->OrderableValue
   Patient --->PatientResultableRange
   Orderable --->RMSOrder
   OrderableValue --->Subject
   Resultable --->DeviceModelToResultable

   RMSAdmission --->RMSAdmissionDoctor
   RMSAdmission --->RMSOrder
   RMSOrder --->RMSSchedule
   RMSSchedule --->RMSScheduleInstance
   RMSScheduleInstance --->OrderableValue
   Employee --->RMSAdmission
   Patient --->RMSAdmission
   Employee --->RMSAdmissionDoctor
   Orderable --->RMSOrder
   Employee --->RMSOrder
   DeviceInventory --->RMSOrder
   RMSOrder --->Subject

   Subject --->Message
   Subject --->SubjectUser
   Message --->MessageStatus
   OrderableValue --->Subject
   RMSOrder --->Subject
   User --->Subject
   User --->Message
   User --->Message
   User --->SubjectUser

   Manufacturer --->DeviceModel
   DeviceType --->DeviceModel
   DeviceModel --->DeviceModelToResultable
   DeviceModel --->DeviceInventory
   DeviceInventory --->DeviceInventoryHistory
   DeviceInventory --->OrderableValue
   DeviceInventory --->RMSOrder
   Resultable --->DeviceModelToResultable
```
