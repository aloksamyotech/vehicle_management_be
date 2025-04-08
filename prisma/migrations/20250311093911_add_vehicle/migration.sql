-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "registrationNo" TEXT NOT NULL,
    "vehicleName" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "chasisNo" TEXT NOT NULL,
    "engineNo" TEXT NOT NULL,
    "manufacturedBy" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "vehicleColor" TEXT,
    "registrationExpiry" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT,
    "doc" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "vehicleGroupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_registrationNo_key" ON "Vehicle"("registrationNo");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_chasisNo_key" ON "Vehicle"("chasisNo");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_engineNo_key" ON "Vehicle"("engineNo");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_vehicleGroupId_fkey" FOREIGN KEY ("vehicleGroupId") REFERENCES "VehicleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
