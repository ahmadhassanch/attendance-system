// import { unixTimestamp } from '../../../src/common/common.helper';
// import { ApiClient } from '../lib/api-client';

// export async function createAdmission(
//   patientId: string,
//   doctorId: string,
//   healthcareId: string,
//   careGiverIds: string[],
// ): Promise<string> {
//   let admissionCareGivers: {}[] = [];

//   for (let k = 0; k < careGiverIds.length; k++) {
//     admissionCareGivers.push({
//       caregiverId: careGiverIds[k],
//       dateStarted: unixTimestamp(),
//     });
//   }

//   const req = {
//     admissionDate: unixTimestamp(),
//     primaryDoctorId: doctorId,
//     patientId: patientId,
//     healthcareFacilityId: healthcareId,
//     rmsAdmissionCaregivers: admissionCareGivers,
//   };

//   let data: { [key: string]: any } = await ApiClient.post(
//     '/rms-admission',
//     req,
//   );
//   return data['rmsAdmissionId'];
// }

// export async function addAdmissionCargiver(
//   admissionId: string,
//   doctorId: string,
// ): Promise<string> {
//   const req = {
//     rmsAdmissionId: admissionId,
//     doctorId: doctorId,
//     dateStarted: unixTimestamp(),
//     // dateStopped: 0,
//     // isDeleted: false,
//   };

//   let data: { [key: string]: any } = await ApiClient.post(
//     '/rms-admission-doctor',
//     req,
//   );
//   return data['rmsAdmissionDoctorId'];
// }
