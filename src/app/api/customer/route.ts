import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET(req: Request) {
  const userId = req.headers.get("X-User-Id");
  if (!userId) {
    return NextResponse.json(
      { error: "Parâmetro 'userId' é obrigatório." },
      { status: 400 }
    );
  }
  const customers = await prisma.customer.findMany({
    where: {
      salon: {
        ownerId: userId,
      },
    },
  });
  return NextResponse.json(customers);
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
    const newCustomer = await prisma.customer.create({
      data: {
        ...body,
        salonId: salon.id,
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar serviço.", details: (error as Error).message },
      { status: 500 }
    );
  }
}
