/*
  Warnings:

  - You are about to drop the column `cpnj` on the `Company` table. All the data in the column will be lost.
  - Added the required column `cnpj` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "cpnj",
ADD COLUMN     "cnpj" TEXT NOT NULL;
