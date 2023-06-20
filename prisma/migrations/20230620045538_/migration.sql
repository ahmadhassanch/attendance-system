-- CreateTable
CREATE TABLE `User` (
    `userId` CHAR(40) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `image` VARCHAR(300) NULL,
    `title` VARCHAR(191) NULL,
    `middleName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    `birthDate` BIGINT NULL,
    `email` VARCHAR(100) NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `nic` VARCHAR(191) NULL,
    `address1` VARCHAR(191) NULL,
    `address2` VARCHAR(191) NULL,
    `zipCode` VARCHAR(191) NULL,
    `isActivated` BOOLEAN NOT NULL DEFAULT false,
    `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    `phoneVerified` BOOLEAN NOT NULL DEFAULT false,
    `useTwoFactor` BOOLEAN NOT NULL DEFAULT false,
    `otpSecret` VARCHAR(40) NULL,
    `emergencyContactPerson` VARCHAR(191) NULL,
    `emergencyContactPhone` VARCHAR(191) NULL,
    `userInt` INTEGER NULL,
    `userDate` BIGINT NULL,
    `userString` CHAR(255) NULL,
    `userFloat` DOUBLE NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `dateCreated` BIGINT NOT NULL,
    `dateUpdated` BIGINT NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_mobile_key`(`mobile`),
    UNIQUE INDEX `User_nic_key`(`nic`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSession` (
    `sessionId` CHAR(40) NOT NULL,
    `sessionData` TEXT NOT NULL,
    `device` VARCHAR(191) NOT NULL,
    `deviceName` VARCHAR(191) NULL,
    `deviceModel` VARCHAR(191) NULL,
    `osName` VARCHAR(191) NULL,
    `osVersion` VARCHAR(191) NULL,
    `userId` CHAR(40) NOT NULL,

    PRIMARY KEY (`sessionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCode` (
    `userCodeId` CHAR(40) NOT NULL,
    `codeType` ENUM('ACCOUNT_VERIFICATION', 'VERIFY_PHONE', 'FORGOT_PASSWORD', 'TWO_FACTOR_LOGIN') NOT NULL,
    `code` CHAR(8) NOT NULL,
    `expiresAt` BIGINT NOT NULL,
    `appSignature` CHAR(32) NULL,
    `userId` CHAR(40) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `dateCreated` BIGINT NOT NULL,
    `dateUpdated` BIGINT NOT NULL,

    PRIMARY KEY (`userCodeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Setting` (
    `settingId` CHAR(40) NOT NULL,
    `settingName` VARCHAR(100) NOT NULL,
    `settingJson` TEXT NOT NULL,

    UNIQUE INDEX `Setting_settingName_key`(`settingName`),
    PRIMARY KEY (`settingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSetting` (
    `userSettingId` CHAR(40) NOT NULL,
    `notify` BOOLEAN NOT NULL DEFAULT true,
    `language` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `userSettingJson` TEXT NOT NULL,

    UNIQUE INDEX `UserSetting_userId_key`(`userId`),
    PRIMARY KEY (`userSettingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRole` (
    `userRoleId` CHAR(40) NOT NULL,
    `userId` CHAR(40) NOT NULL,
    `role` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`userRoleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `employeeId` CHAR(40) NOT NULL,
    `employeeNo` CHAR(20) NULL,
    `employeeType` ENUM('CHI_US', 'CHI_PAK', 'PRACTICE_EMPLOYEE') NOT NULL DEFAULT 'PRACTICE_EMPLOYEE',
    `userId` CHAR(40) NOT NULL,
    `managerId` CHAR(40) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `dateCreated` BIGINT NOT NULL,
    `dateUpdated` BIGINT NOT NULL,

    UNIQUE INDEX `Employee_employeeNo_key`(`employeeNo`),
    UNIQUE INDEX `Employee_userId_key`(`userId`),
    PRIMARY KEY (`employeeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `companyId` CHAR(40) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `fax` VARCHAR(191) NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `postalCode` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `settings` TEXT NOT NULL,
    `pocId` CHAR(40) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `dateCreated` BIGINT NOT NULL,
    `dateUpdated` BIGINT NOT NULL,

    PRIMARY KEY (`companyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `taskId` CHAR(40) NOT NULL,
    `taskName` VARCHAR(191) NOT NULL,
    `taskDescription` VARCHAR(191) NOT NULL,
    `taskLeadId` CHAR(40) NULL,
    `taskStatus` ENUM('WAITING', 'ACTIVE', 'COMPLETED') NOT NULL,
    `parentTaskId` CHAR(40) NULL,

    PRIMARY KEY (`taskId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecordType` (
    `breakTypeId` CHAR(40) NOT NULL,
    `breakName` VARCHAR(191) NOT NULL,
    `breakDescription` TEXT NOT NULL,

    PRIMARY KEY (`breakTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attendance` (
    `attendanceId` CHAR(40) NOT NULL,
    `employeeId` CHAR(40) NOT NULL,
    `checkin` BIGINT NOT NULL,
    `checkout` BIGINT NOT NULL,
    `recordTypeId` CHAR(40) NOT NULL,
    `taskId` CHAR(40) NULL,

    PRIMARY KEY (`attendanceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSession` ADD CONSTRAINT `UserSession_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCode` ADD CONSTRAINT `UserCode_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSetting` ADD CONSTRAINT `UserSetting_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `Employee`(`employeeId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_pocId_fkey` FOREIGN KEY (`pocId`) REFERENCES `Employee`(`employeeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_taskLeadId_fkey` FOREIGN KEY (`taskLeadId`) REFERENCES `Employee`(`employeeId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_parentTaskId_fkey` FOREIGN KEY (`parentTaskId`) REFERENCES `Task`(`taskId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`employeeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_recordTypeId_fkey` FOREIGN KEY (`recordTypeId`) REFERENCES `RecordType`(`breakTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`taskId`) ON DELETE SET NULL ON UPDATE CASCADE;
