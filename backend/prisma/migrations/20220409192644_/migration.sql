/*
  Warnings:

  - You are about to drop the column `roleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `permissionsID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_companyId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roleId",
ADD COLUMN     "permissionsID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Roles";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_permissionsID_fkey" FOREIGN KEY ("permissionsID") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
