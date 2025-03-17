import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {
  calculateIdealRevenue,
  calculateRealRevenue,
  calculateTotalCosts,
} from "@/lib/profitCalc";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const salonId = req.nextUrl.searchParams.get("salonId");
  if (!salonId) {
    return NextResponse.json({ error: "salonId is required" }, { status: 400 });
  }

  const periodStart = new Date("2023-01-01");
  const periodEnd = new Date("2023-12-31");

  const services = await prisma.service.findMany({
    where: { salonId: salonId as string },
  });

  if (!services.length) {
    return NextResponse.json({ message: "No services found" });
  }

  const professionals = await prisma.professional.findMany({
    where: { salonId: salonId as string },
  });

  if (!professionals.length) {
    return NextResponse.json({ message: "No professionals found" });
  }

  const profitabilityData = await Promise.all(
    services.map(async (service) => {
      const professional = professionals.find(
        (p) => p.id === service.professionalId
      );

      if (!professional) return null;

      const idealRevenue = await calculateIdealRevenue(
        service,
        professional,
        periodStart,
        periodEnd
      );
      const realRevenue = await calculateRealRevenue(
        service.id,
        periodStart,
        periodEnd
      );
      const totalCosts = await calculateTotalCosts(
        salonId as string,
        periodStart,
        periodEnd
      );

      const idealProfit = idealRevenue - totalCosts;
      const realProfit = realRevenue - totalCosts;
      const profitPercentage = ((realProfit / totalCosts) * 100).toFixed(2);

      return {
        serviceId: service.id,
        serviceName: service.name,
        idealRevenue,
        realRevenue,
        totalCosts,
        idealProfit,
        realProfit,
        profitPercentage: `${profitPercentage}%`,
      };
    })
  );
  console.log(services, professionals);
  return NextResponse.json(profitabilityData.filter(Boolean));
}
