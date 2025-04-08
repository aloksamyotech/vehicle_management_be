/*
  Warnings:

  - A unique constraint covering the columns `[vehicleName]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_vehicleName_key" ON "Vehicle"("vehicleName");
