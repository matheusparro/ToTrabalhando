/*
  Warnings:

  - You are about to drop the column `userId` on the `Company` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_userId_fkey";

-- DropIndex
DROP INDEX "Company_userId_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "userId";
