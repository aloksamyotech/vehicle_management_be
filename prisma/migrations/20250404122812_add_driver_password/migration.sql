/*
  Warnings:

  - Added the required column `iv` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "iv" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
