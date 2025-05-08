/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Customer_mobileNo_key";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "intermediateCities" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
