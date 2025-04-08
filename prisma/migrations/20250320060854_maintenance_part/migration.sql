/*
  Warnings:

  - You are about to drop the column `partsInventoryId` on the `Maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Maintenance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Maintenance" DROP CONSTRAINT "Maintenance_partsInventoryId_fkey";

-- AlterTable
ALTER TABLE "Maintenance" DROP COLUMN "partsInventoryId",
DROP COLUMN "quantity";

-- CreateTable
CREATE TABLE "MaintenanceParts" (
    "id" SERIAL NOT NULL,
    "maintenanceId" INTEGER NOT NULL,
    "partsInventoryId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "MaintenanceParts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MaintenanceParts" ADD CONSTRAINT "MaintenanceParts_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "Maintenance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceParts" ADD CONSTRAINT "MaintenanceParts_partsInventoryId_fkey" FOREIGN KEY ("partsInventoryId") REFERENCES "PartsInventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
