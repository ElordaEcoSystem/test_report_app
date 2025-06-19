/*
  Warnings:

  - You are about to drop the column `customerId` on the `WorkOrder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkOrder" DROP CONSTRAINT "WorkOrder_customerId_fkey";

-- AlterTable
ALTER TABLE "WorkOrder" DROP COLUMN "customerId",
ADD COLUMN     "confirmedById" TEXT;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_confirmedById_fkey" FOREIGN KEY ("confirmedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
