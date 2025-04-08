/*
  Warnings:

  - A unique constraint covering the columns `[invoiceNo]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoiceNo` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "invoiceNo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_invoiceNo_key" ON "Booking"("invoiceNo");
