export type saleReturnItemType = {
  product_id: string;
  item_id: string;
  item_index: number;
  quantity: number;
  remarks: string;
  total_amount: number;
  price: number;
  batch_no: string;
  expiry_date: bigint;
  unit_cost: number;
  actual_price: number;
};

export type saleDataType = {
  bank_account_id?: string;
  customer_id?: string;
  doctor_license?: string;
  doctor_name?: string;
  invoice_date: bigint;
  payment_mode: string;
  received_amount: number;
  tz_offset: number;
  remarks?: string;
  store_id: string;
  store: { id: string; name: string };
  updated_by_id: string;
};

export type getTestRequireDataReturnType = {
  entry: object;
  services: any;
  ac_discount: string;
  ac_receivable: string;
  ac_unearned_income: string;
  ac_payable: string;
  ac_income: string;
  ac_cos: string;
  ac_inventory: string;
  clinicId: string;
  clinicName: string;
  cusId: string;
  cusName: string;
  serviceId: string;
  serviceName: string;
  deptId: string;
  deptName: string;
  roomId: string;
  roomName: string;
  empId: string;
  empName: string;
};

export type getTransactionRequiredDataType = {
  entry: object;
  deptId: string;
  deptName: string;
  acReceivable: string;
  acCash: string;
  acExpense: string;
  acPayable: string;
  acInventory: string;
  acIncome: string;
  acCos: string;
  acDiscount: string;
};

export type creditPurchaseItemsType = {
  product_id: string;
  quantity: number;
  pack_size: number;
  price: number;
  sale_price: number;
  loose_packing: boolean;
  discount: number;
  discount_type: string;
  stock_quantity: number;
  return_quantity: number | null;
  batch_no: string;
  expiry_date: number;
  unit_cost: number;
  remarks: string;
  item_id: string;
  item_index: number;
  actual_amount: number;
  total_discount: number;
  discounted_amount: number;
};

export type purchaseReturnItemsType = {
  product_id: string;
  quantity: number;
  price: number;
  batch_no: string;
  expiry_date: bigint;
  item_id: string;
  item_index: number;
  total_amount: number;
  remarks: string;
  reason: string;
};

export type fileObjectType = {
  file_id: string;
  file_name: string;
  file_ext: string;
  file_size: number;
  content_type: string;
  file_path: string;
  file_url: string;
};

export type infoType = {
  company_name: string;
  phone?: string;
  street_address?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  top_margin?: string;
  bottom_margin?: string;
  country?: string;
  logo?: fileObjectType;
  logo_url?: string;
  letter_head?: fileObjectType;
  letter_url?: string;
};

export type expiringItems = {
  supplier_id: string;
  items: {
    supplier_id: string;
    items: [oneExpiringItem];
    store_id: string;
    store_name: string;
  };
  store_id: string;
  store_name: string;
};

export type oneExpiringItem = {
  item_id: string;
  product_id: string;
  product_name: string;
  strength: string;
  stock_quantity: number;
  quantity: number;
  discounted_amount: number;
  unit_price: number;
  batch_no: string;
  expiry_date: bigint;
};

// enum
export const EnvironmentVars = {
  JWT_SECRET: 'JWT_SECRET',
  LOG_QUERIES: 'LOG_QUERIES',
  LOG_REQUESTS: 'LOG_REQUESTS',
  AUTH_COOKIE_SECRET: 'AUTH_COOKIE_SECRET',
  DATABASE_URL: 'DATABASE_URL',
  SMS_ENABLED: 'SMS_ENABLED',
  SMS_LOGIN_ID: 'SMS_LOGIN_ID',
  SMS_PASSWORD: 'SMS_PASSWORD',
  SMS_METHOD: 'SMS_METHOD',
  NOTIFICATION_SERVER_URL: 'NOTIFICATION_SERVER_URL',
  CALL_SERVER_URL: 'CALL_SERVER_URL',
  EXTERNAL_SERVICES_URL: 'EXTERNAL_SERVICES_URL',
  SEND_NOTIFICATIONS: 'SEND_NOTIFICATIONS',
  TWILIO_ACCOUNT_SID: 'TWILIO_ACCOUNT_SID',
  TWILIO_AUTH_TOKEN: 'TWILIO_AUTH_TOKEN',
  TWILIO_PHONE_NUMBER: 'TWILIO_PHONE_NUMBER',
  SEND_CALL_DATA: 'SEND_CALL_DATA',
  SMTP_MAIL_FROM: 'SMTP_MAIL_FROM',
  SMTP_SECRET: 'SMTP_SECRET',
} as const;

export type EnvironmentVars = keyof typeof EnvironmentVars;

export type UserSettingJsonType = {
  units: {
    temperature: 'C' | 'F';
    weight: 'kg' | 'lb';
  };
};

export const RoleType = {
  SUPERADMIN: 'SUPERADMIN',
  PATIENT: 'PATIENT',
  PHYSICIAN: 'PHYSICIAN',
  GUARDIAN: 'GUARDIAN',
  NURSE_PRACTITIONER: 'NURSE_PRACTITIONER',
  PHYSICIAN_ASSISTANT: 'PHYSICIAN_ASSISTANT',
  OFFICE_STAFF: 'OFFICE_STAFF',
  REGULAR_NURSE: 'REGULAR_NURSE',
  BILLING_STAFF: 'BILLING_STAFF',

  CHI_US_ADMIN: 'CHI_US_ADMIN',
  CHI_US_PROVIDER: 'CHI_US_PROVIDER',
  CHI_TECH: 'CHI_TECH',
  CHI_PK_PROVIDER: 'CHI_PK_PROVIDER',
  CHI_PK_NURSE: 'CHI_PK_NURSE',
} as const;

export type RoleType = keyof typeof RoleType;
