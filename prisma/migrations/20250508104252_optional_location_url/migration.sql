/*
  Warnings:

  - A unique constraint covering the columns `[bookingId,cityName]` on the table `Checkpoint` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Checkpoint" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Checkpoint_bookingId_cityName_key" ON "Checkpoint"("bookingId", "cityName");
