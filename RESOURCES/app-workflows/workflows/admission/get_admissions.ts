import { getDate } from '../../../../../src/common/common.helper';
import { ApiClient } from '../../lib/api-client';

async function checkSpecialty(name: String): Promise<string> {
  const req = {
    specialty: name,
  };

  let data: { [key: string]: any } = await ApiClient.get('/specialty', {
    search: name,
  });

  if (data['records'].length == 1) {
    return data['records'][0]['specialtyId'];
  }
  return 'FALSE';
}

export async function getPatients(): Promise<any> {
  let data: { [key: string]: any } = await ApiClient.get('/patient-new', {});
  return data;
}

export async function getEmployees(): Promise<any> {
  let data: { [key: string]: any } = await ApiClient.get('/employee', {});
  return data;
}

export async function getSchduleByRange(
  startInterval: number,
  endInterval: number,
  patientId: string,
): Promise<any> {
  let req: {} = {};
  if (patientId !== null) {
    req = {
      startInterval: startInterval,
      endInterval: endInterval,
      patientId: patientId,
    };
  } else {
    req = {
      startInterval: startInterval,
      endInterval: endInterval,
    };
  }
  let data: { [key: string]: any }[] = await ApiClient.get(
    '/scheduling/by-range',
    req,
  );

  const records = data.map((rec) => {
    return {
      Orderable: rec.orderable.name,
      dueTime: getDate(rec.dueTime),
      isTaken: rec.taken,

      // hospitalNo: rec.hospitalNo,
    };
  });

  return records;
}

// http://localhost:3000/rms/v1/scheduling/by-range?startInterval=1670494400&endInterval=1680494400
