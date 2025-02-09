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
    const expenses = await prisma.expense.findMany({
      where: {
        salon: {
          ownerId: userId,
        },
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar serviços.", details: (error as Error).message },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  const userId = req.headers.get("X-User-Id");
  const body = await req.json();
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
    const newExpense = await prisma.expense.create({
      data: {
        ...body,
        salonId: salon.id,
      },
    });

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar despesa.", details: (error as Error).message },
      { status: 500 }
    );
  }
}
