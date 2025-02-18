import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    if (!id) {
      return NextResponse.json(
        { error: "ID do salão não fornecido." },
        { status: 400 }
      );
    }

    const data = await request.json();

    const salon = await prisma.salon.update({
      where: { id },
      data,
    });

    return NextResponse.json(salon);
  } catch {
    return NextResponse.json(
      { error: "Ocorreu um erro ao atualizar o salão." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    if (!id) {
      return NextResponse.json(
        { error: "ID do salão não fornecido." },
        { status: 400 }
      );
    }

    const salon = await prisma.salon.findUnique({
      where: { id },
    });

    if (!salon) {
      return NextResponse.json(
        { error: "Salão não encontrado." },
        { status: 404 }
      );
    }

    await prisma.salon.delete({ where: { id } });

    return NextResponse.json({ message: "Salão deletado com sucesso." });
  } catch {
    return NextResponse.json(
      { error: "Ocorreu um erro ao deletar o salão." },
      { status: 500 }
    );
  }
}
