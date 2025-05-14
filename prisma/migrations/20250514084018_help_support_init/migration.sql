-- CreateTable
CREATE TABLE "HelpSupport" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "driverId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HelpSupport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HelpSupport" ADD CONSTRAINT "HelpSupport_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE;
