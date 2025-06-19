-- AlterTable
ALTER TABLE "WorkOrder" ALTER COLUMN "object" DROP NOT NULL,
ALTER COLUMN "object" SET DEFAULT 'Без названия';
