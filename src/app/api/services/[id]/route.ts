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
        { error: "ID do serviço não fornecido." },
        { status: 400 }
      );
    }

    const data = await request.json();

    const service = await prisma.service.update({
      where: { id },
      data,
    });

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json(
      { error: "Ocorreu um erro ao atualizar o serviço." },
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
        { error: "ID do serviço não fornecido." },
        { status: 400 }
      );
    }

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Serviço deletado com sucesso." });
  } catch (error) {
    return NextResponse.json(
      { error: "Ocorreu um erro ao deletar o serviço." },
      { status: 500 }
    );
  }
}
