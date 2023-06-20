//STEP 1: DEFINE AN EVENT NAME
export const CustomEvent = {
  OrderableValueDue: 'OrderableValueDue',
  OrderableValueOverdue: 'OrderableValueOverdue',
  RmsOrderAssigned: 'RmsOrderAssigned',
  RmsOrderChanged: 'RmsOrderChanged',
  AdmissionStarted: 'AdmissionStarted',
  AdmissionEnded: 'AdmissionEnded',
  OrderableValueRegistered: 'OrderableValueRegistered',
  LiveOrderableValueRegistered: 'LiveOrderableValueRegistered',
  OrderableValueEscalated: 'OrderableValueEscalated',
  AddedAsCaregiver: 'AddedAsCaregiver',
  PrimaryAdmissionDoctorAssigned: 'PrimaryAdmissionDoctorAssigned',
  PrimaryGuardianAssigned: 'PrimaryGuardianAssigned',
  RmsMessageReceived: 'RmsMessageReceived',
} as const;

export type CustomEvent = keyof typeof CustomEvent;

export type EventMessageData = {
  OrderableValueDue: {
    patientId: string;
    orderableId: string;
    orderableName: string;
    rmsScheduleId: string;
    rmsScheduleInstanceId: string;
    dueTime: number;
  };

  OrderableValueOverdue: {
    patientId: string;
    orderableId: string;
    orderableName: string;
    rmsScheduleId: string;
    rmsScheduleInstanceId: string;
    dueTime: number;
  };

  RmsOrderAssigned: {
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    rmsOrderId: string;
    orderableId: string;
    orderableName: string;
  };

  RmsOrderChanged: {
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    rmsOrderId: string;
    orderableId: string;
    orderableName: string;
  };

  AdmissionStarted: {
    rmsAdmissionId: string;
    admissionDate: number;
    patientId: string;
    primaryDoctorId: string;
  };

  AdmissionEnded: {
    patientId: string;
    rmsAdmissionId: string;
    dischargeDate: number;
  };

  OrderableValueRegistered: {
    orderableValueId: string;
    patientId: string;
    status: string;
    acquisitionTime: number;
  };

  LiveOrderableValueRegistered: {
    orderableValueId: string;
    patientId: string;
    status: string;
    acquisitionTime: number;
  };

  OrderableValueEscalated: {
    orderableValueId: string;
    orderableId: string;
    orderableName: string;
    status: string;
    escalatedById: string;
    subjectId: string;
  };

  AddedAsCaregiver: {
    caregiverId: string;
    patientId: string;
    rmsAdmissionId: string;
  };

  PrimaryAdmissionDoctorAssigned: {
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    rmsAdmissionId: string;
  };

  PrimaryGuardianAssigned: {
    patientId: string;
    patientName: string;
    guardianId: string;
    guardianName: string;
  };

  //STEP 2: Define "MESSAGE DATA" for this type of event.
  RmsMessageReceived: {
    messageId: string;
    subjectId: string;
    subjectTitle: string;
    senderId: string;
    senderName: string;
    messageType: string;
    messageText: string;
    copyToPatient: boolean;
    dateCreated: number;
    messageUrl?: string;
  };
};

//STEP 3: Define "MATCH DATA"
export type EventMatchData = {
  OrderableValueDue: {};
  OrderableValueOverdue: {};
  RmsOrderAssigned: {};
  RmsOrderChanged: {};
  AdmissionStarted: {};
  AdmissionEnded: {};
  OrderableValueRegistered: {};
  LiveOrderableValueRegistered: {};
  OrderableValueEscalated: {};
  AddedAsCaregiver: {};
  PrimaryAdmissionDoctorAssigned: {};
  PrimaryGuardianAssigned: {};
  RmsMessageReceived: {};
};

type CheckCustomEvent<T extends Record<string, unknown>> =
  CustomEvent extends keyof T ? true : false;

// DO NOT REMOVE THIS LINE, IT VERY IMPORTANT,
// IT WILL KEEP SHOWING ERROR IF DEFINITIONS (IE.)  STEP 1, 2, 3 ARE NOT OK.
const isEventMessageTypeValid: CheckCustomEvent<EventMessageData> = true; //CHECKS STEP 2: MESSAGE DATA DEFINED OR NOT
const isEventMatchDataTypeValid: CheckCustomEvent<EventMatchData> = true; //CHECKS STEP 3: MATCH DATA
