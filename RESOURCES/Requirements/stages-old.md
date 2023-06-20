## Flutter/Angular generation.

- Write down workflows (with permissions)
- file upload mechanism
- RMS
  - Notification mechanism
  - Scheduling, timers, etc.
  - ....

## Things to do

1. Escallations (messaging)
1. Device Assignment
1. Continouous devices
1. Calls
1. Messages
1. Translations (LTR, RTL)
1. CGMS
1. realtime (TOCO, PC102, etc)

KAFKA STUFF

## Less Important Tables

- UserSession
- UserCode
- RMSAdmissionDoctor
- Specialty
- OrderableToResultable
- DeviceModelToResultable
- DeviceInventoryToResultable
- Manufacturer
- DeviceType
- RMSAdmissionDoctor
- PatientResultableRange

## Without Devices and Admission

```mermaid
graph TD;

classDef blue fill:#00f
classDef red fill:#a30
classDef green fill:#0f0

Escalation:::red
Orderable:::blue
Resultable:::blue
OrderableValue:::red
ResultableValue:::red
Patient:::red
Employee:::red

  User-->Patient:::red
  User-->Employee
  Orderable-->OrderableValue
  Patient-->OrderableValue
  OrderableValue:::red-->ResultableValue:::red
  Resultable-->ResultableValue
  OrderableValue-->Escalation
  Employee-->Escalation
  Escalation-->EscalationMessages
  Employee-->EscalationMessages

```

## Without Admission (With Devices)

```mermaid
graph TD;
    classDef blue fill:#00f
    classDef red fill:#a30
    classDef green fill:#0f0
    DeviceModel:::blue
Escalation:::red

RMSOrder:::red
Orderable:::blue
Resultable:::blue
OrderableValue:::red
ResultableValue:::red
Patient:::red
Employee:::red

  User-->Patient
  User-->Employee
  Orderable-->OrderableValue

  Patient-->OrderableValue
  DeviceInventory-.->OrderableValue
  OrderableValue-->ResultableValue
  Resultable-->ResultableValue
  OrderableValue-->Escalation
  Employee-->Escalation
  Escalation-->EscalationMessages
  Employee-->EscalationMessages
  DeviceModel-->DeviceInventory
  DeviceInventory-->DeviceIssueHistory
```

## Without Devices

```mermaid
graph TD;
classDef blue fill:#00f
classDef red fill:#a30
classDef green fill:#0f0

Escalation:::red
RMSScheduleInstance:::red
RMSOrder:::red
Orderable:::blue
Resultable:::blue
OrderableValue:::red
ResultableValue:::red
Patient:::red
Employee:::red

  User-->Patient
  User-->Employee
  Orderable-->OrderableValue
  RMSScheduleInstance-.->OrderableValue
  Patient-->OrderableValue

  OrderableValue-->ResultableValue
  Resultable-->ResultableValue
  Employee-->RMSAdmission
  Patient-->RMSAdmission
  RMSAdmission-->RMSOrder
  Orderable-->RMSOrder
  Employee-->RMSOrder
  RMSOrder-->RMSSchedule
  RMSSchedule-->RMSScheduleInstance
  OrderableValue-->Escalation
  Employee-->Escalation
  Escalation-->EscalationMessages
  Employee-->EscalationMessages

```

## Complete

```mermaid
graph TD;
classDef blue fill:#00f
classDef red fill:#a30
classDef green fill:#0f0

DeviceModel:::blue
DeviceInventory:::red
Escalation:::red
RMSScheduleInstance:::red
RMSOrder:::red
Orderable:::blue
Resultable:::blue
OrderableValue:::red
ResultableValue:::red
Patient:::red
Employee:::red

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
  OrderableValue-->Escalation
  Employee-->Escalation
  Escalation-->EscalationMessages
  Employee-->EscalationMessages
  DeviceModel-->DeviceInventory
  DeviceInventory-->DeviceIssueHistory
```

## Complete Diagram with All Tables

```mermaid

flowchart TD
classDef blue fill:#00f
classDef red fill:#a30
classDef green fill:#0f0

subgraph USER
User ---> UserSession
User ---> UserCode
Specialty ---> Employee:::red
User ---> Guardian
User ---> Patient:::red
Guardian ---> Patient
User ---> Employee
end

subgraph VITALS
Orderable ---> OrderableToResultable
Resultable:::blue ---> OrderableToResultable
Orderable:::blue ---> OrderableValue:::red


Patient ---> OrderableValue
OrderableValue ---> ResultableValue:::red
Resultable ---> ResultableValue
Patient ---> PatientResultableRange
Resultable ---> PatientResultableRange
Resultable ---> DeviceModelToResultable
end

subgraph ADMISSION
Employee ---> RMSAdmission
Patient ---> RMSAdmission
RMSAdmission ---> RMSAdmissionDoctor
Employee ---> RMSAdmissionDoctor
RMSAdmission ---> RMSOrder
Orderable ---> RMSOrder
Employee ---> RMSOrder
RMSOrder:::red ---> RMSSchedule
RMSSchedule ---> RMSScheduleInstance:::red
RMSScheduleInstance ---> OrderableValue
end

subgraph ESCALLATION
OrderableValue ---> Escalation
Employee ---> Escalation
Escalation:::red ---> EscalationMessages
Employee ---> EscalationMessages
end

subgraph DEVICES
Manufacturer ---> DeviceModel:::blue
DeviceType ---> DeviceModel

DeviceModel ---> DeviceModelToResultable
DeviceModel ---> DeviceInventory:::red
DeviceInventory ---> DeviceInventoryHistory
DeviceInventory ---> RMSOrder
end
```
