-- CreateTable
CREATE TABLE "BookingNotification" (
    "id" SERIAL NOT NULL,
    "driverId" INTEGER NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookingNotification" ADD CONSTRAINT "BookingNotification_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingNotification" ADD CONSTRAINT "BookingNotification_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
