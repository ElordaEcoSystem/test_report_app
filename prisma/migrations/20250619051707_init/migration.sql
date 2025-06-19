/*
  Warnings:

  - You are about to drop the column `completedWorksAt` on the `WorkOrder` table. All the data in the column will be lost.
  - You are about to drop the column `completedWorksPhotoUrl` on the `WorkOrder` table. All the data in the column will be lost.
  - You are about to drop the `CompletedWorkItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompletedWorkItem" DROP CONSTRAINT "CompletedWorkItem_workOrderId_fkey";

-- AlterTable
ALTER TABLE "WorkOrder" DROP COLUMN "completedWorksAt",
DROP COLUMN "completedWorksPhotoUrl",
ADD COLUMN     "completedWorkOrderAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "CompletedWorkItem";

-- CreateTable
CREATE TABLE "WorkItem" (
    "id" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "needWorkText" TEXT,
    "completedWorkText" TEXT,
    "photoUrl" TEXT,
    "workOrderId" TEXT NOT NULL,
    "completedWorkItem" TIMESTAMP(3),

    CONSTRAINT "WorkItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkItem" ADD CONSTRAINT "WorkItem_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
