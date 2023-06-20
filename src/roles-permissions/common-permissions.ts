// No reports perms and more
export const allPerms = {
  Observations: { Create: true, View: true },
  LiveSessions: { Create: true, View: true },
  HomeAdmissions: { Create: true, View: true },

  Messages: { Create: true, View: true },

  Patient: { Create: true, View: true },
  Employee: { Create: true, View: true },
  Facility: { Create: true, View: true },

  BillingEventsReport: { Create: true, View: true },

  Phr: { Create: true, View: true },
  HealthcareFacilityInfo: { Create: false, View: true },

  // TermsAgreed: { Create: true, View: true },
};

// All perms except audit and event log
export const chiUsAdminPerms = {
  Observations: { Create: true, View: true },
  LiveSessions: { Create: true, View: true },
  HomeAdmissions: { Create: true, View: true },
  FollowUpCalls: { Create: true, View: true },
  Recordings: { Create: true, View: true },
  PatientAppMonitoring: { Create: true, View: true },

  Messages: { Create: true, View: true },

  Patient: { Create: true, View: true },
  Employee: { Create: true, View: true },
  Facility: { Create: true, View: true },

  PatientPerformanceReport: { Create: true, View: true },
  Last24CriticalReport: { Create: true, View: true },
  Last24RMissedReport: { Create: true, View: true },
  BillingEventsReport: { Create: true, View: true },

  Phr: { Create: true, View: true },
  HealthcareFacilityInfo: { Create: false, View: true },

  Manufacturer: { Create: true, View: true },
  DeviceModel: { Create: true, View: true },
  DeviceType: { Create: true, View: true },
  Inventory: { Create: true, View: true },
  Orderables: { Create: true, View: true },
  Resultables: { Create: true, View: true },
  Allergy: { Create: true, View: true },
  InsuranceCompany: { Create: true, View: true },
  InsurancePlan: { Create: true, View: true },
};

export const physicianPerms = {
  Observations: { Create: true, View: true },
  LiveSessions: { Create: true, View: true },
  HomeAdmissions: { Create: true, View: true },

  Messages: { Create: true, View: true },

  Patient: { Create: true, View: true },
  Employee: { Create: true, View: true },
};

export const chiUsProviderPerms = {
  ...physicianPerms,
};

// All perms
export const supperPerms = {
  ...chiUsAdminPerms,
  AuditLogs: { Create: true, View: true },
  EventLogs: { Create: true, View: true },
};

// all view perms with no report except (BillingEventsReport) and no followup calls, recording, patient app monitoring
export const allViewPerms = {
  Observations: { Create: false, View: true },
  LiveSessions: { Create: false, View: true },
  HomeAdmissions: { Create: false, View: true },

  Messages: { Create: false, View: true },

  Patient: { Create: false, View: true },
  Employee: { Create: false, View: true },
  Facility: { Create: false, View: true },

  BillingEventsReport: { Create: false, View: true },

  Manufacturer: { Create: false, View: true },
  DeviceModel: { Create: false, View: true },
  DeviceType: { Create: false, View: true },
  Inventory: { Create: false, View: true },
  Orderables: { Create: false, View: true },
  Resultables: { Create: false, View: true },
  Allergy: { Create: false, View: true },
  InsuranceCompany: { Create: false, View: true },
  InsurancePlan: { Create: false, View: true },

  Phr: { Create: false, View: true },
  HealthcareFacilityInfo: { Create: false, View: true },
};

// all view permissions without setting and report except (BillingEventsReport) and no followup calls, recording, patient app monitoring
export const allViewPermsNoSettings = {
  Observations: { Create: false, View: true },
  LiveSessions: { Create: false, View: true },
  HomeAdmissions: { Create: false, View: true },

  Messages: { Create: false, View: true },

  Patient: { Create: false, View: true },
  Employee: { Create: false, View: true },
  Facility: { Create: false, View: true },

  BillingEventsReport: { Create: false, View: true },

  Phr: { Create: false, View: true },
  HealthcareFacilityInfo: { Create: false, View: true },
};

export const billingStaffPerms = {
  Patient: { Create: false, View: true },
  BillingEventsReport: { Create: true, View: true },
};

export const nursePractitioner = {
  Observations: { Create: true, View: true },
  LiveSessions: { Create: true, View: true },
  HomeAdmissions: { Create: true, View: true },

  Patient: { Create: true, View: true },
  Employee: { Create: true, View: true },
  Facility: { Create: false, View: true },
};

export const officeStaffPerms = {
  Patient: { Create: false, View: true },
  Employee: { Create: false, View: true },
  Facility: { Create: false, View: true },
};

export const physicianAssistant = {
  ...nursePractitioner,
};

export const regularNursePerms = {
  ...nursePractitioner,
};
