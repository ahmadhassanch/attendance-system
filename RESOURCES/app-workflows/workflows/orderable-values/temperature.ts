import { unixTimestamp } from '../../../../../src/common/common.helper';
import { ApiClient } from '../../lib/api-client';

export async function createTemperatureReading(
  patientId: string,
  value: number,
  timePerformed: number,
): Promise<string> {
  const req = {
    orderableId: '5',
    patientId: patientId,
    observationTime: timePerformed,
    acquisitionTime: timePerformed,
    captureTime: timePerformed,
    readingTime: timePerformed,
    status: 'NORMAL',
    resultableValues: [
      {
        resultableId: '25',
        numericValue: value,
      },
    ],
  };

  let data: { [key: string]: any } = await ApiClient.post(
    '/scheduling/register-orderable-value',
    req,
  );
  return data['orderableValueId'];
}

export async function createMedicationReading(
  patientId: string,
  timePerformed: number,
  quantiyTaken: number,
): Promise<string> {
  const req = {
    orderableId: 'MED-ORDERABLE-ID',
    patientId: patientId,
    observationTime: timePerformed,
    acquisitionTime: timePerformed,
    captureTime: timePerformed,
    readingTime: timePerformed,
    status: 'NORMAL',
    resultableValues: [
      {
        resultableId: 'MED-RESULTABLE-ID',
        numericValue: quantiyTaken,
        medicationId: 'G6903ROBZV',
      },
    ],
  };

  let data: { [key: string]: any } = await ApiClient.post(
    '/scheduling/register-orderable-value',
    req,
  );
  return data['orderableValueId'];
}
