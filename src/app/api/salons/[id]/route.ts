import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const salon = await prisma.salon.update({ where: { id: params.id }, data });
  return NextResponse.json(salon);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const salon = await prisma.salon.findUnique({
      where: { id },
    });
    if (!salon) {
      return NextResponse.json(
        { error: "Salão não encontrado." },
        { status: 404 }
      );
    }
    await prisma.salon.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "Salão deletado com sucesso." });
  } catch (error) {
    return NextResponse.json(
      { error: "Ocorreu um erro ao deletar o salão." },
      { status: 500 }
    );
  }
}
