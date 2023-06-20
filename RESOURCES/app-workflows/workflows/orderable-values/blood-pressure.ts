import { unixTimestamp } from '../../../../../src/common/common.helper';
import { ApiClient } from '../../lib/api-client';

export async function createBloodPressureReading(
  patientId: string,
  systolic: number,
  diastolic: number,
  timePerformed: number,
): Promise<string> {
  const orderableId = '1';

  const req = {
    orderableId,
    patientId,
    observationTime: timePerformed,
    acquisitionTime: timePerformed,
    captureTime: timePerformed,
    readingTime: timePerformed,
    status: 'NORMAL',
    isValid: true,
    resultableValues: [
      {
        // systolic
        resultableId: '1',
        numericValue: systolic,
        status: 'CRITICAL_LOW',
      },
      {
        // diastolic
        resultableId: '2',
        numericValue: diastolic,
        status: 'CRITICAL_LOW',
      },
    ],
  };

  let data: { [key: string]: any } = await ApiClient.post(
    '/scheduling/register-orderable-value',
    req,
  );
  return data['orderableValueId'];
}
