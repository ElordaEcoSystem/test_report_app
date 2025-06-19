/*
  Warnings:

  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Response` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "WorkOrderStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED', 'PENDING_CONFIRMATION');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_executorId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_requestId_fkey";

-- DropTable
DROP TABLE "Request";

-- DropTable
DROP TABLE "Response";

-- DropEnum
DROP TYPE "RequestStatus";

-- CreateTable
CREATE TABLE "WorkOrder" (
    "id" TEXT NOT NULL,
    "object" TEXT NOT NULL,
    "description" TEXT,
    "status" "WorkOrderStatus" NOT NULL DEFAULT 'PENDING',
    "createdById" TEXT NOT NULL,
    "customerId" TEXT,
    "completedWorksText" TEXT,
    "completedWorksPhotoUrl" TEXT,
    "completedWorksAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
