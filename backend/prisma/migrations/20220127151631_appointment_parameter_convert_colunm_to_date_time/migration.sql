/*
  Warnings:

  - Changed the type of `endAfterTime` on the `AppointmentParameters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endMorningTime` on the `AppointmentParameters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startAfterTime` on the `AppointmentParameters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `startMorningTime` on the `AppointmentParameters` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AppointmentParameters" DROP COLUMN "endAfterTime",
ADD COLUMN     "endAfterTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endMorningTime",
ADD COLUMN     "endMorningTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "startAfterTime",
ADD COLUMN     "startAfterTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "startMorningTime",
ADD COLUMN     "startMorningTime" TIMESTAMP(3) NOT NULL;
