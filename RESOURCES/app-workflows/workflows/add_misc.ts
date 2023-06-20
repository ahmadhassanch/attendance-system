import { ApiClient } from '../lib/api-client';

async function createPermissionGroup(): Promise<string> {
  const req = {
    groupName: `groupName`,
  };
  // console.log(req);
  let data: { [key: string]: any } = await ApiClient.post(
    '/permission-group',
    req,
  );
  return data['permissionGroupId'];
}

async function createDeviceModel(): Promise<string> {
  const req = {
    deviceName: `deviceName`,
    modelCode: 'modelCode',
    deviceAbbr: 'deviceAbbr',
    deviceIcon: 'deviceIcon',
    isDeleted: false,
  };
  // console.log(req);
  let data: { [key: string]: any } = await ApiClient.post('/device-model', req);
  return data['deviceId'];
}

async function createOrderableSchedule(): Promise<string> {
  const req = {
    scheduleName: 'scheduleName',
    alertGap: 101,
    orderableInstructions: 'orderableInstructions',
    graceTime: 0,
    startTime: 0,
    repeatDelta: 'DAY',
    repeatAfter: 101,
    frequency: 101,
    nextStartTime: 0,
  };
  // console.log(req);
  let data: { [key: string]: any } = await ApiClient.post(
    '/orderable-schedule',
    req,
  );
  return data['scheduleId'];
}

// console.log("added adhoc resultable : ", adhocOrderValueId2);

// data = await ApiClient.get('/patient', { search: '', page: 1, per_page: 5 });
// console.log(data);

// const roleId: string = await createRole();
// console.log(roleId);

// console.log(roleId);
// const patientId: string = await createPatient(userId);

// console.log(patientId);
// const scheduleId: string = await createOrderableSchedule();
// console.log(scheduleId);

// const deviceId: string = await createDeviceModel();
// console.log(deviceId);

// const resultableId: string = await createResultable();
// console.log(resultableId);

// const settingId: string = await createSetting();
// console.log(settingId);

// const permissionGroupId: string = await createPermissionGroup();
// console.log(permissionGroupId);
