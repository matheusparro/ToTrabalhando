/*
  Warnings:

  - Added the required column `updatedAt` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "AppointmentParameters" (
    "id" SERIAL NOT NULL,
    "startTime" INTEGER NOT NULL,
    "lunchTime" INTEGER NOT NULL,
    "endTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentParameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentParametersOnUsers" (
    "userId" INTEGER NOT NULL,
    "appointmentParametersId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentParametersOnUsers_pkey" PRIMARY KEY ("userId","appointmentParametersId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentParametersOnUsers_userId_key" ON "AppointmentParametersOnUsers"("userId");

-- AddForeignKey
ALTER TABLE "AppointmentParametersOnUsers" ADD CONSTRAINT "AppointmentParametersOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentParametersOnUsers" ADD CONSTRAINT "AppointmentParametersOnUsers_appointmentParametersId_fkey" FOREIGN KEY ("appointmentParametersId") REFERENCES "AppointmentParameters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
