-- AlterTable
ALTER TABLE `Employee` ADD COLUMN `numLeavesAllowed` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `numLeavesTaken` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `EmployeeRole` (
    `employeeRoleId` CHAR(40) NOT NULL,
    `roleName` VARCHAR(191) NOT NULL,
    `roleDescription` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`employeeRoleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveType` (
    `leaveTypeId` CHAR(40) NOT NULL,
    `leaveName` VARCHAR(191) NOT NULL,
    `leaveDescription` TEXT NOT NULL,

    PRIMARY KEY (`leaveTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveRequest` (
    `leaveRequestId` CHAR(40) NOT NULL,
    `employeeId` CHAR(40) NOT NULL,
    `leaveTypeId` CHAR(40) NOT NULL,
    `startDate` BIGINT NOT NULL,
    `endDate` BIGINT NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `reason` TEXT NOT NULL,

    PRIMARY KEY (`leaveRequestId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`employeeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LeaveRequest` ADD CONSTRAINT `LeaveRequest_leaveTypeId_fkey` FOREIGN KEY (`leaveTypeId`) REFERENCES `LeaveType`(`leaveTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
