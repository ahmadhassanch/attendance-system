import { Prisma, PrismaClient } from '@prisma/client';
import { Subject } from 'rxjs';
import {
  MakeTimedIDUnique,
  datesForCreate,
} from '../../../src/common/common.helper';

const prisma = new PrismaClient(); //test

class CreateSubjectWithMessageDto {
  ownerId: string;
  patientId: string; //all AdmissionCaregivers would be added
  subjectTitle: string;
  message?: string; //message won't be sent to anybody

  // there would be one general subject when admission is reated
  orderableValueId?: string; //in case of escallation
  orderableId?: string; //in case or escallation or order assigned/changed/deleted
}

async function createSubject(createSub: CreateSubjectWithMessageDto) {
  let subjectId = '';
  let patientId = createSub.patientId;
  //Patient ID and Patient's User ID

  const patientUser = await prisma.patient.findUnique({
    where: { patientId },
    include: {
      user: true,
    },
  });
  console.log(patientUser);

  //Get Admission Info for the Patient
  let admission = await prisma.rMSAdmission.findFirstOrThrow({
    where: {
      patientId,
      dischargeDate: null,
    },
    include: {
      rmsAdmissionCaregivers: true,
    },
  });
  console.log(admission);

  let data1: Prisma.RPMSubjectUncheckedCreateInput = {
    rpmSubjectId: MakeTimedIDUnique(),
    title: 'title12',
    orderableValueId: '01df1c36-320e-4c55-b013-ad3ecf65818c',
    orderableId: '5',
    patientId,
    // rmsOrderId: 'rmsOrderId',
    // ownerId: 'ownerId',
    messageWorkflow: 'ESCALATED',
    isDeleted: false,
    ...datesForCreate(),
  };

  let result1 = await prisma.rPMSubject.create({
    select: {
      title: true,
      rpmSubjectId: true,
    },
    data: data1,
  });

  //Create UserSubject

  let data2: Prisma.UserSubjectUncheckedCreateInput[] =
    admission.rmsAdmissionCaregivers.map((caregiver) => {
      return {
        userSubjectId: MakeTimedIDUnique(),
        subjectId: data1.rpmSubjectId,
        userId: caregiver.caregiverId,
      };
    });
  data2.push({
    userSubjectId: MakeTimedIDUnique(),
    subjectId: data1.rpmSubjectId,
    userId: patientUser.userId,
  });
  console.log(data2);

  let result2 = await prisma.userSubject.createMany({
    data: data2,
  });

  //Create Message

  let message: Prisma.RPMMessageUncheckedCreateInput = {
    rpmMessageId: MakeTimedIDUnique(),
    rpmSubjectId: result1.rpmSubjectId,
    messageType: 'TEXT',
    messageText: 'This is a dummy text',
    copyToPatient: true,
    senderId: patientUser.userId,
    isDeleted: false,
    ...datesForCreate(),
  };

  let result3 = await prisma.rPMMessage.create({
    data: message,
  });

  // Create UserMessages

  let data4: Prisma.UserMessageUncheckedCreateInput[] =
    admission.rmsAdmissionCaregivers.map((caregiver) => {
      return {
        messageStatusId: MakeTimedIDUnique(),
        messageId: result3.rpmMessageId,
        userId: caregiver.caregiverId,
        messageDeliveryStatus: 'SENT',
        isDeleted: false,
        ...datesForCreate(),
      };
    });
  data4.push({
    messageStatusId: MakeTimedIDUnique(),
    messageId: result3.rpmMessageId,
    userId: patientUser.userId,
    messageDeliveryStatus: 'SENT',

    ...datesForCreate(),
  });
  console.log(data4);
  let result5 = await prisma.userMessage.createMany({
    data: data4,
  });

  return result1.rpmSubjectId;
}

async function main() {
  const patientId = '9e5ff0bb-6eab-40df-8a7f-9efe676659b4';
  const userId = 'AHSAN-P-USER-ID';

  let createSub: CreateSubjectWithMessageDto = {
    ownerId: 'abc',
    patientId: userId,
    subjectTitle: 'First subject',
    message: 'optional',
    orderableValueId: '33',
    orderableId: '5',
  };
  createSubject(createSub);

  console.log('Subject created and messages sent to user.');

  getSubjects(userId);
}

async function getSubjects(userId: string) {
  //Get Subjects for a User
  let subjectsOfUser = await prisma.rPMSubject.findMany({
    where: {
      subjectUsers: {
        some: {
          userId,
        },
      },
    },
    skip: 1,
    take: 10,
    orderBy: { rpmSubjectId: Prisma.SortOrder.desc },
  });
  return subjectsOfUser;
}

//Get Messages for a Subject for a User
// let messagesOfUserForSubject = await prisma.rPMMessage.findMany({
//   where: {
//     rpmSubjectId: result1.rpmSubjectId,
//     userMessages: {
//       some: {
//         userId: patientUser.userId,
//       },
//     },
//   },
//   skip: 1,
//   take: 10,
//   orderBy: { rpmSubjectId: Prisma.SortOrder.desc },
// });

// let result4 = await prisma.rPMSubject.findMany({});
// console.log(result4);

// // console.log(subjectsOfUser);
// console.log(messagesOfUserForSubject);
// }
main();
