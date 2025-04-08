/*
  Warnings:

  - You are about to drop the column `email` on the `Driver` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mobileNo]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobileNo]` on the table `Driver` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Driver_email_key";

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "email";

-- CreateIndex
CREATE UNIQUE INDEX "Customer_mobileNo_key" ON "Customer"("mobileNo");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_mobileNo_key" ON "Driver"("mobileNo");
