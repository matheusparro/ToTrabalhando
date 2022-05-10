/*
  Warnings:

  - You are about to drop the column `endTime` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `endTimeEnd` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `startTimeEnd` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `appointmentTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "endTime",
DROP COLUMN "endTimeEnd",
DROP COLUMN "startTime",
DROP COLUMN "startTimeEnd",
ADD COLUMN     "appointmentTime" TIMESTAMP(3) NOT NULL;
