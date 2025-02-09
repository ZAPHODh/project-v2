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
export async function POST(req: Request) {
  console.log("chegou aqui");
  const userId = req.headers.get("X-User-Id");
  const body = await req.json();
  const { sale, saleItems } = body;
  console.log(sale, saleItems, body);
  const salon = await prisma.salon.findFirst({
    where: {
      ownerId: userId as string,
    },
  });

  if (!salon) {
    return NextResponse.json(
      { error: "Salão não encontrado." },
      { status: 404 }
    );
  }

  try {
    const newSale = await prisma.sale.create({
      data: {
        ...sale,
        salonId: salon.id,
      },
      include: {
        items: {
          include: {
            service: true,
          },
        },
      },
    });

    const newSaleItems = await prisma.saleItem.createMany({
      data: saleItems.map((item: any) => ({
        ...item,
        saleId: newSale.id,
        total: item.price * item.quantity,
      })),
    });

    return NextResponse.json({ newSale, newSaleItems }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar venda.", details: (error as Error).message },
      { status: 500 }
    );
  }
}
