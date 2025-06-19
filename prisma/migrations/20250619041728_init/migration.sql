/*
  Warnings:

  - You are about to drop the column `completedWorksText` on the `WorkOrder` table. All the data in the column will be lost.
  - You are about to drop the column `object` on the `WorkOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkOrder" DROP COLUMN "completedWorksText",
DROP COLUMN "object";

-- CreateTable
CREATE TABLE "CompletedWorkItem" (
    "id" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "workText" TEXT NOT NULL,
    "workOrderId" TEXT NOT NULL,

    CONSTRAINT "CompletedWorkItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompletedWorkItem" ADD CONSTRAINT "CompletedWorkItem_workOrderId_fkey" FOREIGN KEY ("workOrderId") REFERENCES "WorkOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
