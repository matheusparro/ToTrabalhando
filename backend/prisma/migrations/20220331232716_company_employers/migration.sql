/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "Avatar" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CompanyEmployers" (
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyEmployers_pkey" PRIMARY KEY ("userId","companyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyEmployers_userId_key" ON "CompanyEmployers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_userId_key" ON "Company"("userId");

-- AddForeignKey
ALTER TABLE "CompanyEmployers" ADD CONSTRAINT "CompanyEmployers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyEmployers" ADD CONSTRAINT "CompanyEmployers_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
