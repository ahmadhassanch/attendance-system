import { createTemperatureReading } from '../workflows/orderable-values/temperature';
// import { createAdmission, addAdmissionCargiver } from '../workflows/admission';
import { createRmsOrder } from '../workflows/rms-order';
import { getTimeStamp } from '../../../src/common/common.helper';
import { ApiClient } from '../lib/api-client';
import { App, AppUser } from '../types/workflow-types';
import { Task } from '@prisma/client';
import { TaskEntity } from 'src/modules/task/entities';
import { CreateTaskDto } from 'src/modules/task/dto';

/**
 * Doctor Ali admitted ahsan patient, and assigned temperture to Ahsan. Ahasan sent temperature reading.
 * Hurmaira Nurse saw and escalated to Dr. Ali, they exchanged 3 messages, and Humaira nurse closed
 * the escalation
 */

async function createAndLoginUsers() {
  let superAdmin = new AppUser('superAdmin', '090078601', 'Testing@1');
  let aliDoctor = new AppUser('aliDoctor', '929998465067', 'Ali@1');
  let humairaNurse = new AppUser('humairaNurse', '924448465067', 'Humaira@1');
  let omairDoctor = new AppUser('omairDoctor', '923338465067', 'Omair@1');
  await superAdmin.login();
  await aliDoctor.login();
  await humairaNurse.login();
  await omairDoctor.login();
}

async function createTasks() {
  App.setActive('aliDoctor');

  let project: CreateTaskDto = {
    taskName: 'Flutter Project',
    taskDescription: 'Attendance System in Flutter',
    taskLeadId: 'ALI-DOCTOR-ID',
    taskStatus: 'WAITING',
    // "parentTaskId": "aba026d6-d696-470f-a090-28e62a0ec45b"
  };

  let projectEntity: TaskEntity = await ApiClient.post('/task', project);
  console.log(projectEntity.taskId);

  let projectTask1 = {
    taskName: 'Login Screens',
    taskDescription: 'Login tasks',
    taskLeadId: 'ALI-DOCTOR-ID',
    taskStatus: 'WAITING',
    parentTaskId: projectEntity.taskId,
  };
  let projectTask1Entity: TaskEntity = await ApiClient.post(
    '/task',
    projectTask1,
  );
}

async function main() {
  ApiClient.create();
  await createAndLoginUsers(); //...

  await createTasks(); //webapp
}

main();
