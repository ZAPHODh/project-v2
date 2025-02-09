import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("X-User-Id");
  if (!userId) {
    return NextResponse.json(
      { error: "Parâmetro 'userId' é obrigatório." },
      { status: 400 }
    );
  }

  try {
    const sales = await prisma.sale.findMany({
      where: {
        salon: {
          ownerId: userId,
        },
      },
      include: {
        items: {
          include: {
            product: true,
            service: true,
          },
        },
        customer: true,
      },
    });

    return NextResponse.json(sales);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar serviços.", details: (error as Error).message },
      { status: 500 }
    );
  }
}
