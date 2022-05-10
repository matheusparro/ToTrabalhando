/*
  Warnings:

  - A unique constraint covering the columns `[faceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "faceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_faceId_key" ON "User"("faceId");
