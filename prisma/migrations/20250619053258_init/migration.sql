/*
  Warnings:

  - Made the column `object` on table `WorkOrder` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WorkOrder" ALTER COLUMN "object" SET NOT NULL,
ALTER COLUMN "object" DROP DEFAULT;
