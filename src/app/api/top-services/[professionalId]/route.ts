import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function GET(
  req: Request,
  { params }: { params: { professionalId: string } }
) {
  const { professionalId } = await params;

  try {
    const topServices = await prisma.saleItem.groupBy({
      by: ["serviceId"],
      where: {
        sale: {
          professionalId,
        },
      },
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 10,
    });
    const servicesWithDetails = await Promise.all(
      topServices.map(async (item) => {
        const service = await prisma.service.findUnique({
          where: { id: item.serviceId! },
        });

        return {
          service,
          totalQuantity: item._sum.quantity,
        };
      })
    );

    return NextResponse.json(servicesWithDetails);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch top services" },
      { status: 500 }
    );
  }
}
