-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currencyCode" TEXT NOT NULL DEFAULT 'INR',
ADD COLUMN     "currencySymbol" TEXT NOT NULL DEFAULT '₹';
