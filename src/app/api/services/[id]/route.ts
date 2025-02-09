import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

// PUT
export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    // Verifica se o ID foi fornecido
    if (!id) {
      return NextResponse.json(
        { error: "ID do serviço não fornecido." },
        { status: 400 }
      );
    }

    // Obtém os dados do corpo da requisição
    const data = await request.json();

    // Atualiza o serviço no banco de dados
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

// DELETE
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    // Verifica se o ID foi fornecido
    if (!id) {
      return NextResponse.json(
        { error: "ID do serviço não fornecido." },
        { status: 400 }
      );
    }

    // Deleta o serviço
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
