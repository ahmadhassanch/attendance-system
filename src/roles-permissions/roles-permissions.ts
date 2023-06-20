import { RoleType } from 'src/common/common.types';
import {
  billingStaffPerms,
  chiUsAdminPerms,
  chiUsProviderPerms,
  nursePractitioner,
  officeStaffPerms,
  physicianAssistant,
  physicianPerms,
  regularNursePerms,
  supperPerms,
} from './common-permissions';

// write | read
export const PermissionType = {
  Create: 'Create',
  View: 'View',
} as const;
export type PermissionType = keyof typeof PermissionType;

const CommandCenter = {
  Observations: 'Observations',
  LiveSessions: 'LiveSessions',
  HomeAdmissions: 'HomeAdmissions',
  FollowUpCalls: 'FollowUpCalls',
  Recordings: 'Recordings',
  PatientAppMonitoring: 'PatientAppMonitoring',
};

const Messages = {
  Messages: 'Messages',
};

const Phr = {
  Phr: 'Phr',
};

const Users = {
  Employee: 'Employee',
  Patient: 'Patient',
  Facility: 'Facility',
};

const Reports = {
  AuditLogs: 'AudiLogs',
  EventLogs: 'EventLogs',
  BillingEventsReport: 'BillingEventsReport',
  PatientPerformanceReport: 'PatientPerformanceReport',
  Last24CriticalReport: 'Last24CriticalReport',
  Last24RMissedReport: 'Last24RMissedReport',
};

const Settings = {
  Manufacturer: 'Manufacturer',
  DeviceModel: 'DeviceModel',
  DeviceType: 'DeviceType',
  Inventory: 'Inventory',
  Orderables: 'Orderables',
  Resultables: 'Resultables',
  Allergy: 'Allergy',
  InsuranceCompany: 'InsuranceCompany',
  InsurancePlan: 'InsurancePlan',
};

export const Resource = {
  ...CommandCenter,
  ...Messages,
  ...Users,
  ...Reports,
  ...Settings,
  ...Phr,
  HealthcareFacilityInfo: 'HealthcareFacilityInfo',
  TermsAgreed: 'TermsAgreed',
} as const;

export type Resource = keyof typeof Resource;

type RolesPermissionsType = {
  [roleType in RoleType]: {
    [resource in Resource]?: {
      [permissionType in PermissionType]: boolean;
    };
  };
};

export const RolesPermissions: RolesPermissionsType = {
  SUPERADMIN: supperPerms,
  PATIENT: { TermsAgreed: { Create: true, View: true } },
  GUARDIAN: {},
  BILLING_STAFF: billingStaffPerms,
  NURSE_PRACTITIONER: nursePractitioner,
  OFFICE_STAFF: officeStaffPerms,
  PHYSICIAN_ASSISTANT: physicianAssistant,
  REGULAR_NURSE: regularNursePerms,
  PHYSICIAN: physicianPerms,
  CHI_US_ADMIN: chiUsAdminPerms,
  CHI_US_PROVIDER: chiUsProviderPerms,
  CHI_TECH: supperPerms,
  CHI_PK_PROVIDER: supperPerms,
  CHI_PK_NURSE: supperPerms,
};

type CheckRolesPermissions<T extends Record<string, unknown>> =
  RoleType extends keyof T ? true : false;

const isRolePermissionsTypeValid: CheckRolesPermissions<RolesPermissionsType> =
  true;
