-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "tripEndPincode" TEXT NOT NULL DEFAULT '000000',
ADD COLUMN     "tripStartPincode" TEXT NOT NULL DEFAULT '000000';
