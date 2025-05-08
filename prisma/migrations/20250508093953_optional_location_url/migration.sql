-- AlterTable
ALTER TABLE "Checkpoint" ALTER COLUMN "locationUrl" DROP NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT false;
