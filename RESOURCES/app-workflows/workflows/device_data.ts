import { unixTimestamp } from '../../../../src/common/common.helper';
import { ApiClient } from '../lib/api-client';

export async function findDeviceIdForUniqueCode(
  deviceUniqueCode: string,
): Promise<string> {
  let data: { deviceInventoryId: string } = await ApiClient.get(
    `/admission-devices/${deviceUniqueCode}`,
    {},
  );
  return data.deviceInventoryId;
}

export async function addTemperatureReading(
  patientId: string,
  deviceId: string,
  temperature: number,
  timestamp: number,
) {
  let req = {
    patientId: patientId,
    observations: [
      {
        acquisition_time: timestamp,
        capture_time: timestamp,
        readings: { TEMP: temperature },
      },
    ],
    device_id: deviceId,
    is_manual: false,
  };
  let data: { [key: string]: any } = await ApiClient.post(
    '/admission-devices/post-orderable-value',
    req,
  );
  return data;
}
