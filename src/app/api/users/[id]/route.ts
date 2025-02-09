import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

// GET
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    // Verifica se o ID foi fornecido
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID do usuário não fornecido." },
        { status: 400 }
      );
    }

    // Busca o usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        subscriptionRole: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Erro ao buscar o usuário:", error);
    return NextResponse.json(
      { success: false, message: "Erro ao buscar o usuário." },
      { status: 500 }
    );
  }
}

// PUT
export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    // Verifica se o ID foi fornecido
    if (!id) {
      return NextResponse.json(
        { error: "ID do usuário não fornecido." },
        { status: 400 }
      );
    }

    // Obtém os dados do corpo da requisição
    const body = await request.json();
    const { name, email } = body;

    // Atualiza o usuário no banco de dados
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar o usuário." },
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
        { error: "ID do usuário não fornecido." },
        { status: 400 }
      );
    }

    // Deleta o usuário
    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar o usuário:", error);
    return NextResponse.json(
      { error: "Erro ao deletar o usuário." },
      { status: 500 }
    );
  }
}
