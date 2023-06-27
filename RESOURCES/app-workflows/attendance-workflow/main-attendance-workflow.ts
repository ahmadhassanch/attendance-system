// import { getTimeStamp } from '../../../src/common/common.helper';
// import { createTemperatureReading } from '../workflows/orderable-values/temperature';
// import { createAdmission, addAdmissionCargiver } from '../workflows/admission';
// import { createRmsOrder } from '../workflows/rms-order';

import { ApiClient } from '../lib/api-client';
import { App, AppUser } from '../types/workflow-types';
import { Attendance, Employee, Task, RecordType } from '@prisma/client';
import { TaskEntity } from 'src/modules/task/entities';
import { CreateTaskDto } from 'src/modules/task/dto';
import { CreateEmployeeDto } from 'src/modules/users/employee/dto';
import { CreateAttendanceDto } from 'src/modules/attendance/dto';
import { AttendanceEntity } from 'src/modules/attendance/entities';
import { EmployeeEntity } from 'src/modules/users/employee/entities';
import { RecordTypeEntity } from 'src/modules/record-type/entities';
import { CreateRecordTypeDto } from 'src/modules/record-type/dto';
import e from 'express';
import { json } from 'stream/consumers';

// Global lists to store tasks and record types
const tasks: TaskEntity[] = [];
const recordTypes: RecordTypeEntity[] = [];

// Function to create and login users
async function createAndLoginUsers() {
  const users = [
    new AppUser('superAdmin', '090078601', 'Testing@1'),
    new AppUser('aliDoctor', '929998465067', 'Ali@1'),
    new AppUser('humairaNurse', '924448465067', 'Humaira@1'),
    new AppUser('omairDoctor', '923338465067', 'Omair@1'),
  ];

  for (const user of users) {
    await user.login();
  }
}

// Function to create tasks
async function createTasks() {
  App.setActive('aliDoctor');

  const tasksData = [
    {
      taskName: 'Flutter Project',
      taskDescription: 'Attendance System in Flutter',
      taskLeadId: 'ALI-DOCTOR-ID',
      taskStatus: 'WAITING',
      // "parentTaskId": "aba026d6-d696-470f-a090-28e62a0ec45b"
    },
    {
      taskName: 'React Project',
      taskDescription: 'Attendance System in React',
      taskLeadId: 'UMAIR-DOCTOR-ID',
      taskStatus: 'WAITING',
      // "parentTaskId": "aba026d6-d696-470f-a090-28e62a0ec45b"
    },
  ];

  for (const taskData of tasksData) {
    const taskEntity: TaskEntity = await ApiClient.post('/task', taskData);
    tasks.push(taskEntity); // Store the created task in the global list
    console.log(taskEntity.taskId);
  }
}

// Function to create record types
async function createRecordTypes() {
  App.setActive('superAdmin');

  const recordTypesData = [
    { breakName: 'Lunch Break', breakDescription: 'Employee went for Lunch' },
    { breakName: 'Tea Break', breakDescription: 'Employee went for Tea' },
    { breakName: 'Meeting Break', breakDescription: 'Employee went for Meeting' },
    { breakName: 'Went Home', breakDescription: 'Employee went home' },
  ];

  for (const recordTypeData of recordTypesData) {
    const recordTypeEntity: RecordTypeEntity = await ApiClient.post(
      '/record-type',
      recordTypeData,
    );
    recordTypes.push(recordTypeEntity); // Store the created record type in the global list
  }
}

// Function to generate random check-in and check-out timestamps within a specific range
function generateRandomTimestamps() {
  const minCheckinTimestamp = Date.now() - 1000 * 60 * 60 * 24 * 30; // 30 days ago
  const maxCheckinTimestamp = Date.now(); // Current timestamp
  const checkin = Math.floor(
    Math.random() * (maxCheckinTimestamp - minCheckinTimestamp) + minCheckinTimestamp,
  );

  const checkout = checkin + 1000 * 60 * 60 * 8; // Assuming a fixed 8-hour workday

  return { checkin, checkout };
}

// ...

// Function to generate fixed check-in and check-out timestamps within a specific day
function generateFixedTimestamps() {
  const currentDate = new Date(); // Get the current date and time
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  const checkinTime = new Date(currentYear, currentMonth, 1, 9, 0, 0); // 9:00 AM
  const checkoutTime = new Date(currentYear, currentMonth, 1, 17, 0, 0); // 5:00 PM

  const checkinTimestamp = checkinTime.getTime();
  const checkoutTimestamp = checkoutTime.getTime();

  const timestamps = [];
  for (let day = 1; day <= 30; day++) {
    const dayStartTimestamp = new Date(currentYear, currentMonth, day, 0, 0, 0).getTime();
    timestamps.push({
      checkin: dayStartTimestamp + checkinTimestamp - new Date(currentYear, currentMonth, day, 0, 0, 0).getTimezoneOffset() * 60 * 1000,
      checkout: dayStartTimestamp + checkoutTimestamp - new Date(currentYear, currentMonth, day, 0, 0, 0).getTimezoneOffset() * 60 * 1000,
    });
  }

  return timestamps;
}




async function calculateAverageWorkingHours(employeeId: string) {
  App.setActive('superAdmin');
  const response = await ApiClient.get('/attendance', {});

  const RESPONSE = JSON.stringify(response);
  const parsedResponse = JSON.parse(RESPONSE);

  if (!parsedResponse || typeof parsedResponse !== 'object' || !Array.isArray(parsedResponse.records)) {
    throw new Error('Invalid response or no attendance records found');
  }

  const attendanceRecords: AttendanceEntity[] = parsedResponse.records;
  console.log(attendanceRecords);

  let totalWorkingHours = 0;
  let attendanceCount = 0;

  for (const record of attendanceRecords) {
    if (record.employeeId === employeeId) {
      const workingHours = record.checkout - record.checkin;
      totalWorkingHours += Number(workingHours);
      attendanceCount++;
    }
  }

  let averageWorkingHours = attendanceCount > 0 ? totalWorkingHours / attendanceCount : 0;

  averageWorkingHours = averageWorkingHours / (1000);
  console.log("Average Working Hours")
  console.log("---------------------")
  console.log(averageWorkingHours);
  return averageWorkingHours;
}







// ...

// Function to create attendance records
async function createAttendance() {
  // Create attendance records for UMAIR-DOCTOR-ID
  App.setActive('omairDoctor'); // Set the active user to omairDoctor

  const umairDoctorTimestamps = generateFixedTimestamps();//'UMAIR-DOCTOR-ID'
  for (const timestamp of umairDoctorTimestamps) {
    const { checkin, checkout } = timestamp;

    // Fetch relevant information from the global lists
    const employeeId = 'UMAIR-DOCTOR-ID'; // Replace with actual employee ID
    const taskId = tasks[0].taskId; // Use the first task from the list

    const attendance: CreateAttendanceDto = {
      employeeId,
      recordTypeId: recordTypes[0].breakTypeId,
      taskId,
      checkin: BigInt(checkin),
      checkout: BigInt(checkout),
    };

    const attendanceEntity: AttendanceEntity = await ApiClient.post('/attendance', attendance);
    console.log(attendanceEntity.attendanceId);
  }

  // Create attendance records for ALI-DOCTOR-ID
  App.setActive('aliDoctor'); // Set the active user to aliDoctor

  const aliDoctorTimestamps = generateFixedTimestamps();//'ALI-DOCTOR-ID'
  for (const timestamp of aliDoctorTimestamps) {
    const { checkin, checkout } = timestamp;

    // Fetch relevant information from the global lists
    const employeeId = 'ALI-DOCTOR-ID'; // Replace with actual employee ID
    const taskId = tasks[0].taskId; // Use the first task from the list

    const attendance: CreateAttendanceDto = {
      employeeId,
      recordTypeId: recordTypes[0].breakTypeId,
      taskId,
      checkin: BigInt(checkin),
      checkout: BigInt(checkout),
    };

    const attendanceEntity: AttendanceEntity = await ApiClient.post('/attendance', attendance);
    console.log(attendanceEntity.attendanceId);
  }
}

// Function to calculate and print average working hours
async function calculateAndPrintAverageWorkingHours() {
  console.log('Calculating average working hours...');
  console.log('-----------------------------------');
  console.log('Umair Hours');
  const umairAverageWorkingHours = calculateAverageWorkingHours('UMAIR-DOCTOR-ID');
  console.log('-----------------------------------');
  console.log('-----------------------------------');

  console.log('Calculating average working hours...');
  console.log('-----------------------------------');
  console.log('Ali Hours');
  const aliAverageWorkingHours = calculateAverageWorkingHours('ALI-DOCTOR-ID');

  console.log('UMAIR-DOCTOR-ID Average Working Hours:', umairAverageWorkingHours);
  console.log('ALI-DOCTOR-ID Average Working Hours:', aliAverageWorkingHours);
}

async function main() {
  ApiClient.create();
  await createAndLoginUsers();
  // await createTasks();
  // await createRecordTypes();
  // await createAttendance();
  await calculateAndPrintAverageWorkingHours();
}

main();





