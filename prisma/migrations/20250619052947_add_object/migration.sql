/*
  Warnings:

  - You are about to drop the column `completedWorkOrderAt` on the `WorkOrder` table. All the data in the column will be lost.
  - You are about to drop the `WorkItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `object` to the `WorkOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkItem" DROP CONSTRAINT "WorkItem_workOrderId_fkey";

-- AlterTable
ALTER TABLE "WorkOrder" DROP COLUMN "completedWorkOrderAt",
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "completedWorkText" TEXT,
ADD COLUMN     "needWorkText" TEXT,
ADD COLUMN     "object" TEXT NOT NULL,
ADD COLUMN     "photoUrl" TEXT;

-- DropTable
DROP TABLE "WorkItem";
