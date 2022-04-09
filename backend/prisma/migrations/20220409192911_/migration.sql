-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_permissionsID_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "permissionsID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_permissionsID_fkey" FOREIGN KEY ("permissionsID") REFERENCES "Permissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
