/*
  Warnings:

  - Added the required column `companyId` to the `AppointmentConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `AppointmentConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTimeEnd` to the `AppointmentConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `AppointmentConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTimeEnd` to the `AppointmentConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `AppointmentConfiguration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppointmentConfiguration" ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endTimeEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTimeEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "appointmentConfigurationId" INTEGER;

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "startTimeEnd" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "endTimeEnd" TIMESTAMP(3) NOT NULL,
    "departmentId" INTEGER,
    "employeeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_appointmentConfigurationId_fkey" FOREIGN KEY ("appointmentConfigurationId") REFERENCES "AppointmentConfiguration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentConfiguration" ADD CONSTRAINT "AppointmentConfiguration_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
