-- CreateTable
CREATE TABLE "Profitability" (
    "id" TEXT NOT NULL,
    "salonId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "idealRevenue" DOUBLE PRECISION NOT NULL,
    "realRevenue" DOUBLE PRECISION NOT NULL,
    "totalCosts" DOUBLE PRECISION NOT NULL,
    "idealProfit" DOUBLE PRECISION NOT NULL,
    "realProfit" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profitability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profitability" ADD CONSTRAINT "Profitability_salonId_fkey" FOREIGN KEY ("salonId") REFERENCES "Salon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profitability" ADD CONSTRAINT "Profitability_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
