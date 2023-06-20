import * as readline from 'readline';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
// import { Prisma, PrismaPromise } from '@prisma/client';
import { Request } from 'express';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { newModelPrimaryKeys } from '../modules/primary-keys';
import * as path from 'path';
import * as admin from 'firebase-admin';

import * as accountInfo from './chi-rpm-firebase-adminsdk-4nn08-a63a89dbc9.json';

const fs = require('fs');

export { newModelPrimaryKeys as modelPrimaryKeys };

import CryptoJS from 'crypto-js';
const CryptoJS1: typeof CryptoJS = require('crypto-js');

function timeStampMilliseconds(): number {
  return new Date().getTime();
}

export function unixTimestamp(): number {
  return Math.round(timeStampMilliseconds() / 1000);
}

export function asyncSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function syncSleep(ms: number) {
  const timestamp = timeStampMilliseconds() + ms;
  while (timeStampMilliseconds() < timestamp);
}

// const BASE36_ALPHABETS: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// export function MakeTimedIDUnique(): string {
//   syncSleep(1);

//   let base36: string = '';
//   let num: number = Math.round(timeStampMilliseconds() * 1000);
//   while (num != 0) {
//     const idx = num % BASE36_ALPHABETS.length;
//     num = Math.floor(num / BASE36_ALPHABETS.length);
//     base36 = BASE36_ALPHABETS[idx] + base36;
//   }
//   return base36;
// }

import { v4 as uuidv4 } from 'uuid';
import { User } from '@prisma/client';

export function MakeTimedIDUnique(): string {
  return uuidv4();
}

export function generateHospitalNo(code: Number): string {
  const prefix = 'RPM';
  const paddedNextNumber = String(code).padStart(5, '0');
  return `${prefix}-${paddedNextNumber}`;
}

export function getOffset(page: number, per_page: number) {
  return page == 1 ? 0 : per_page * (page - 1);
}

export function getPages(count: number, per_page: number) {
  let pages: number = 0;
  if (count > 0) {
    per_page = per_page > count ? count : per_page;
    pages = Math.ceil(count / per_page);
  }
  return pages;
}

export function datesForCreate() {
  const timestamp: number = unixTimestamp();
  return { dateCreated: timestamp, dateUpdated: timestamp };
}

export function roundToNPlaces(num: number, N: number): number {
  // @ts-ignore
  return Number(Math.round(num + 'e' + N) + 'e-' + N);
}

// export function getPrimaryKeys(filename: string) {
//   let modelPrimaryKey: {
//     [key: string]: string;
//   } = {};

//   try {
//     // read contents of the file
//     const data = fs.readFileSync(filename, 'UTF-8');

//     // split the contents by new line
//     const lines = data.split(/\r?\n/);

//     // print all lines
//     let currModel = '';
//     let modelOngoing = false;
//     for (let i = 0; i < lines.length; i++) {
//       const currLine = lines[i];

//       if (!modelOngoing) {
//         if (currLine.includes('model')) {
//           currModel = currLine.split(' ')[1];
//           modelOngoing = true;
//         }
//       } else {
//         if (currLine.includes('@id')) {
//           const primaryKey = currLine.split(/\s+/)[1];
//           modelOngoing = false;
//           // console.log(primaryKey)
//           modelPrimaryKey[currModel] = primaryKey;
//         }
//       }
//     }
//   } catch (err) {
//     console.error(err);
//   }

//   return modelPrimaryKey;
// }
// export const modelPrimaryKeys = getPrimaryKeys('./prisma/schema.prisma');
/**
 {
  Role: 'roleId',
  RolePermission: 'permId',
  Setting: 'settingId',
  User: 'userId',
  Specialty: 'specialtyId',
  Employee: 'employeeId',
  Guardian: 'guardianId',
  Sponsor: 'sponsorId',
  '{"readInclude":': 'patientId',
  Admission: 'admissionId',
  AdmissionCaregiver: 'admissionCaregiverId',
  model: 'groupId'
}
 * 
 */
export async function moveFile(from: string, to: string) {
  try {
    // Copying the file to folder
    fs.copyFileSync(from, to);
    // Delete After coping file
    fs.unlinkSync(from);
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException("Can't move file");
  }
}

export function buildFileObject(
  file: FileSystemStoredFile,
  root: string,
  dirName?: string,
) {
  const fileName = path.basename(file.path);
  return {
    file_id: fileName,
    file_name: file.originalName,
    file_ext: path.extname(file.originalName),
    file_size: file.size,
    content_type: file.mimeType,
    file_path: `${file.path.split(root)[0]}${root}/${dirName}${
      file.path.split(root)[1]
    }`,
    file_url: `${root}/${dirName && dirName}/${fileName}`,
  };
}

export function createDir(path: string, root: string, dir: string) {
  if (!fs.existsSync(`${root}/${dir}`)) {
    fs.mkdirSync(`${root}/${dir}`);
  }
}

export function getHost(req: Request) {
  let host: string = req.headers.host!;
  if (req.originalUrl.includes('private/api')) {
    // @ts-ignore
    host = req.headers['header-host'];
    if (!host) {
      return 'impossiblestring';
    }
  }

  // check 127.0.0.1 to support tests
  return host.includes('127.0.0.1:') ? 'localhost:3000' : host;
}

export function decryptText(text: string) {
  const secret = 'k0gn!tea!veHE@lTeAachK@rE';
  const salt = 'cha@r@em$';

  const bytes = CryptoJS1.PBKDF2(secret, salt, {
    keySize: 48,
    iterations: 128,
  });
  const iv = CryptoJS1.enc.Hex.parse(bytes.toString().slice(0, 32));
  const key = CryptoJS1.enc.Hex.parse(bytes.toString().slice(32, 96));

  try {
    const cipher = CryptoJS1.AES.decrypt(text, key, {
      iv,
      mode: CryptoJS1.mode.CBC,
    });
    return cipher.toString(CryptoJS1.enc.Utf8);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function startOfDay(timestamp: number, tzOffset: number) {
  const start = new Date((timestamp + tzOffset) * 1000);
  start.setUTCHours(0, 0, 0, 0);
  return Math.round(start.getTime() / 1000);
}

export function endOfDay(timestamp: number, tzOffset: number) {
  const end = new Date((timestamp + tzOffset) * 1000);
  end.setUTCHours(23, 59, 59, 999);
  return Math.round(end.getTime() / 1000);
}

export function snakeCaseToCamelCase(input: string) {
  input = input
    .split('_')
    .reduce(
      (res: string, word: string) =>
        `${res} ${word.charAt(0).toUpperCase()}${word
          .substring(1)
          .toLowerCase()}`,
      '',
    );
  return input.slice(1);
}

export function getStartTimeForExpiryReturnService() {
  const timezone = process.env.TIMEZONE ? Number(process.env.TIMEZONE) : 18000;
  const currentDate = new Date(timezone);
  const currentDateTimestamp = Math.round(currentDate.getTime());

  const currentDate7am = new Date(currentDateTimestamp + timezone);
  currentDate7am.setUTCHours(8, 0, 0);
  const currentDate7amTimestamp = Math.round(currentDate7am.getTime());

  let nextTime;
  if (currentDate7amTimestamp > currentDateTimestamp) {
    nextTime = currentDate7amTimestamp;
  } else {
    nextTime = currentDate7amTimestamp + 86400;
  }
  return nextTime - currentDateTimestamp;
}

export function _getAlphaNumericUniqueCode(codeLength: number = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < codeLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function _getNumericUniqueCode(codeLength: number = 4): string {
  const chars = '0123456789';
  let result = '';

  for (let i = 0; i < codeLength; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function getTimeStamp(datetimeString: string) {
  const datetime = new Date(datetimeString);
  const timestamp = datetime.getTime() / 1000;
  let v = Math.floor(timestamp);
  // console.log(v);
  return v;
}

export function getDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // const formattedTimestamp = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  const formattedTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedTimestamp;
}

export async function getInput(prompt: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

export function kgToLb(kg: number): number {
  return Number((kg * 2.20462262185).toFixed(2));
}

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function isListOfStrings(str: string) {
  const regex = /^\[(('[^']*')|("[^"]*"))(,\s*(('[^']*')|("[^"]*")))*\]$/;
  return regex.test(str);
}

function getFirebaseApp() {
  const serviceAccount = {
    projectId: accountInfo.project_id,
    privateKey: accountInfo.private_key,
    clientEmail: accountInfo.client_email,
  };

  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  return app.messaging();
}

export const firebaseApp = getFirebaseApp();

type UserToAnonymize = Partial<
  Pick<
    User,
    | 'firstName'
    | 'middleName'
    | 'lastName'
    | 'fullName'
    | 'gender'
    | 'birthDate'
    | 'title'
    | 'address1'
    | 'address2'
    | 'email'
    | 'phone'
    | 'zipCode'
    | 'mobile'
  >
>;
export function anonymizeUser<T extends UserToAnonymize>(userInfo: T): T {
  const sensitiveKeys = [
    'firstName',
    'middleName',
    'lastName',
    'fullName',
    'gender',
    'birthDate',
    'title',
    'address1',
    'address2',
    'email',
    'phone',
    'zipCode',
    'mobile',
  ];
  for (const key in userInfo) {
    if (key === 'birthDate') {
      userInfo.birthDate = null;
      continue;
    }
    if (sensitiveKeys.includes(key)) {
      // @ts-ignore
      userInfo[key] = '---';
    }
  }
  return userInfo;
}

export function convertUnixToDate(date: number) {
  if (date < 0)
    throw new NotImplementedException(
      'Total time of call is negative (PROBLEM) [CALL-SERVER]',
    );
  const duration = date;
  const seconds = duration % 60;
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600);

  const formatedDate = `${hours}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return formatedDate;
}
