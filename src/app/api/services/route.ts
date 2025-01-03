import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("X-User-Id");
  console.log(userId);
  if (!userId) {
    return NextResponse.json(
      { error: "Parâmetro 'userId' é obrigatório." },
      { status: 400 }
    );
  }

  try {
    const services = await prisma.service.findMany({
      where: {
        salon: {
          ownerId: userId,
        },
      },
    });

    return NextResponse.json(services);
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
    const newService = await prisma.service.create({
      data: {
        ...body,
        salonId: salon.id,
      },
    });
    console.log(newService);
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar serviço.", details: (error as Error).message },
      { status: 500 }
    );
  }
}
