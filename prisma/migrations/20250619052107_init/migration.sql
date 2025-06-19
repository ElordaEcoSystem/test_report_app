/*
  Warnings:

  - You are about to drop the column `completedWorkItem` on the `WorkItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkItem" DROP COLUMN "completedWorkItem",
ADD COLUMN     "completedAt" TIMESTAMP(3);
