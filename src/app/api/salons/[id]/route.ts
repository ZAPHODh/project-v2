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
        { error: "ID do salão não fornecido." },
        { status: 400 }
      );
    }

    // Obtém os dados do corpo da requisição
    const data = await request.json();

    // Atualiza o salão no banco de dados
    const salon = await prisma.salon.update({
      where: { id },
      data,
    });

    return NextResponse.json(salon);
  } catch (error) {
    return NextResponse.json(
      { error: "Ocorreu um erro ao atualizar o salão." },
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
        { error: "ID do salão não fornecido." },
        { status: 400 }
      );
    }

    // Verifica se o salão existe
    const salon = await prisma.salon.findUnique({
      where: { id },
    });

    if (!salon) {
      return NextResponse.json(
        { error: "Salão não encontrado." },
        { status: 404 }
      );
    }

    // Deleta o salão
    await prisma.salon.delete({ where: { id } });

    return NextResponse.json({ message: "Salão deletado com sucesso." });
  } catch (error) {
    return NextResponse.json(
      { error: "Ocorreu um erro ao deletar o salão." },
      { status: 500 }
    );
  }
}
