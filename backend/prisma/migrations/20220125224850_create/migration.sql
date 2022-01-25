/*
  Warnings:

  - You are about to drop the column `endTime` on the `AppointmentParameters` table. All the data in the column will be lost.
  - You are about to drop the column `lunchTime` on the `AppointmentParameters` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `AppointmentParameters` table. All the data in the column will be lost.
  - Added the required column `endAfterTime` to the `AppointmentParameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endMorningTime` to the `AppointmentParameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAfterTime` to the `AppointmentParameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startMorningTime` to the `AppointmentParameters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppointmentParameters" DROP COLUMN "endTime",
DROP COLUMN "lunchTime",
DROP COLUMN "startTime",
ADD COLUMN     "endAfterTime" INTEGER NOT NULL,
ADD COLUMN     "endMorningTime" INTEGER NOT NULL,
ADD COLUMN     "startAfterTime" INTEGER NOT NULL,
ADD COLUMN     "startMorningTime" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
