//File to query the database using prisma client

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



async function createLeaves(){
    // first create leaves taken by UMAIR-DOCTOR-ID within a month
    const umairDoctorLeaves = [
        {
            leaveRequestId: '1',
            employeeId: 'UMAIR-DOCTOR-ID',
            leaveTypeId: '1',
            startDate: 1625097600,
            endDate: 1625097600,
            status: 'Approved',
            reason: 'Sick',
        },
        {
            leaveRequestId: '2',
            employeeId: 'UMAIR-DOCTOR-ID',
            leaveTypeId: '2',
            startDate: 1625443200,
            endDate: 1625443200,
            status: 'Approved',
            reason: 'Half Leave',
        },
        {
            leaveRequestId: '3',
            employeeId: 'UMAIR-DOCTOR-ID',
            leaveTypeId: '2',
            startDate: 1625770800,
            endDate: 1625770800,
            status: 'Approved',
            reason: 'Half Leave',
        },
        {
            leaveRequestId: '4',
            employeeId: 'UMAIR-DOCTOR-ID',
            leaveTypeId: '3',
            startDate: 1626721200,
            endDate: 1626721200,
            status: 'Approved',
            reason: 'Quarter Leave',
        },
        {
            leaveRequestId: '5',
            employeeId: 'UMAIR-DOCTOR-ID',
            leaveTypeId: '3',
            startDate: 1626894000,
            endDate: 1626894000,
            status: 'Approved',
            reason: 'Quarter Leave',
        },
    ];

    const umairDoctorLeavesData = await prisma.leaveRequest.createMany({
        data: umairDoctorLeaves,
        skipDuplicates: true,
    });
    console.log('Created Leaves:', umairDoctorLeavesData); // create leaves taken by UMAIR-DOCTOR-ID

    // create leaves taken by ALI-DOCTOR-ID

    const aliDoctorLeaves = [
        {
            leaveRequestId: '6',
            employeeId: 'ALI-DOCTOR-ID',
            leaveTypeId: '1',
            startDate: 1625097600,
            endDate: 1625097600,
            status: 'Approved',
            reason: 'Sick',
        },
        {
            leaveRequestId: '7',
            employeeId: 'ALI-DOCTOR-ID',
            leaveTypeId: '2',
            startDate: 1625443200,
            endDate: 1625443200,
            status: 'Approved',
            reason: 'Half Leave',
        },
        {
            leaveRequestId: '8',
            employeeId: 'ALI-DOCTOR-ID',
            leaveTypeId: '2',
            startDate: 1625770800,
            endDate: 1625770800,
            status: 'Approved',
            reason: 'Half Leave',
        },
        {
            leaveRequestId: '9',
            employeeId: 'ALI-DOCTOR-ID',
            leaveTypeId: '3',
            startDate: 1626721200,
            endDate: 1626721200,
            status: 'Approved',
            reason: 'Quarter Leave',
        },
        {
            leaveRequestId: '10',
            employeeId: 'ALI-DOCTOR-ID',
            leaveTypeId: '3',
            startDate: 1626894000,
            endDate: 1626894000,
            status: 'Approved',
            reason: 'Quarter Leave',
        },
    ];

    const aliDoctorLeavesData = await prisma.leaveRequest.createMany({
        data: aliDoctorLeaves,
        skipDuplicates: true,
    });
    console.log('Created Leaves:', aliDoctorLeavesData); // create leaves taken by ALI-DOCTOR-ID

}



async function createLeaveTypes() {
    const leaveTypes = [
      {
        leaveTypeId: '1', // Provide the appropriate leaveTypeId or use Prisma's autoIncrement strategy
        leaveName: 'Full Leave',
        leaveDescription: 'Employee was sick',
      },
      {
        leaveTypeId: '2',
        leaveName: 'Half Leave',
        leaveDescription: 'Employee was on half leave',
      },
      {
        leaveTypeId: '3',
        leaveName: 'Quarter Leave',
        leaveDescription: 'Employee was on Quarter leave',
      }
      
    ];
    const leaveTypesData = await prisma.leaveType.createMany({
      data: leaveTypes,
      skipDuplicates: true,
    });
    console.log('Created LeaveTypes:', leaveTypesData);
}

function countTotalDays(startDate: BigInt, endDate: BigInt) {
    const startTimestamp = parseInt(startDate.toString());
    const endTimestamp = parseInt(endDate.toString());
    const totalDays = [];
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  
    for (let timestamp = startTimestamp; timestamp <= endTimestamp; timestamp += oneDay) {
      const date = new Date(timestamp);
      totalDays.push(date);
    }
  
    return totalDays.length;
  }
  

  

function countWeekendDays(startDate: BigInt, endDate: BigInt) {
    const startTimestamp = parseInt(startDate.toString());
    const endTimestamp = parseInt(endDate.toString());
    const weekendDays = [];
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  
    for (let timestamp = startTimestamp; timestamp <= endTimestamp; timestamp += oneDay) {
      const date = new Date(timestamp);
      const day = date.getDay();
      if (day === 0 || day === 6) {
        weekendDays.push(date);
      }
    }
  
    return weekendDays.length;
  }
  



async function calculateWorkingDays(){
    const startDate = BigInt(1625079600000); // July 1, 2021 (a Thursday)
    const endDate = BigInt(1627671600000); // July 31, 2021 (a Sunday)
    const weekendDaysCount = countWeekendDays(startDate, endDate);
    const totalDaysCount = countTotalDays(startDate, endDate);

    // we fetch the leaves taken by UMAIR-DOCTOR-ID
    const umairDoctorLeaves = await prisma.leaveRequest.findMany({
        where: {
            employeeId: 'UMAIR-DOCTOR-ID',
        },
    });
    console.log('Leaves taken by UMAIR-DOCTOR-ID:', umairDoctorLeaves);
    // calculating the working days of UMAIR-DOCTOR-ID
    // first calculat the sick leaves
    let sickLeaves = 0;
    let halfLeaves = 0;
    let quarterLeaves = 0;
    umairDoctorLeaves.forEach((leave) => {
        if (leave.leaveTypeId === '1') {
            sickLeaves++;
        }
        else if (leave.leaveTypeId === '2') {
            halfLeaves++;
        }
        else if (leave.leaveTypeId === '3') {
            quarterLeaves++;
        }
    }
    );
    console.log('Sick Leaves:', sickLeaves);
    console.log('Half Leaves:', halfLeaves);
    console.log('Quarter Leaves:', quarterLeaves);
    console.log("Number of weekend days:", weekendDaysCount);
    console.log('Total Days:', totalDaysCount);
    // now we calculate the working days of UMAIR-DOCTOR-ID
    const workingHours = 8*(totalDaysCount-weekendDaysCount-sickLeaves-(halfLeaves*0.5)-(quarterLeaves*0.25));
    console.log('Working Hours:', workingHours);

    // now we calculate the working hours of umair doctor in 2 weeks
    // we fetch the leaves taken by UMAIR-DOCTOR-ID in 2 weeks
    const umairDoctorLeavesIn2Weeks = await prisma.leaveRequest.findMany({
        where: {
            employeeId: 'UMAIR-DOCTOR-ID',
            startDate: {
                gte: 1625097600,
                lte: 1626375600,
            },
        },
    });
    console.log('Leaves taken by UMAIR-DOCTOR-ID in 2 weeks:', umairDoctorLeavesIn2Weeks);
    const startDate2 = BigInt(1625097600000); // July 1, 2021 (a Thursday)
    const endDate2 = BigInt(1626375600000); // July 31, 2021 (a Sunday)
    const weekendDaysCount2 = countWeekendDays(startDate2, endDate2);
    const totalDaysCount2 = countTotalDays(startDate2, endDate2);
    
    // calculating the working days of UMAIR-DOCTOR-ID in 2 weeks
    // first calculat the sick leaves
    sickLeaves = 0;
    halfLeaves = 0;
    quarterLeaves = 0;
    umairDoctorLeavesIn2Weeks.forEach((leave) => {
        if (leave.leaveTypeId === '1') {
            sickLeaves++;
        }
        else if (leave.leaveTypeId === '2') {
            halfLeaves++;
        }
        else if (leave.leaveTypeId === '3') {
            quarterLeaves++;
        }
    }
    );
    console.log('Sick Leaves:', sickLeaves);
    console.log('Half Leaves:', halfLeaves);
    console.log('Quarter Leaves:', quarterLeaves);
    console.log("Number of weekend days:", weekendDaysCount2);
    console.log('Total Days:', totalDaysCount2);

    // now we calculate the working hours of UMAIR-DOCTOR-ID in 2 weeks
    const workingHoursIn2Weeks = 8*(totalDaysCount2-weekendDaysCount2-sickLeaves-(halfLeaves*0.5)-(quarterLeaves*0.25));
    console.log('Working Hours in 2 weeks:', workingHoursIn2Weeks);
}


async function main() {
    // createLeaveTypes();
    // createLeaves();
    calculateWorkingDays();
    }

main()
    .catch((e) => {
        throw e;
    }
)
    .finally(async () => {
        await prisma.$disconnect();
    }
);

