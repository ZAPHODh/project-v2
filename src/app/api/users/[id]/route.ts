"use server";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

// GET
export async function GET(req: Request, { params }: any) {
  const id = (await params).id;

  if (!id)
    return NextResponse.json(
      { success: false, message: "ID do usuário não fornecido." },
      { status: 400 }
    );

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
}

export async function PUT(request: Request, { params }: any) {
  try {
    const id = (await params).id;

    if (!id) {
      return NextResponse.json(
        { error: "ID do usuário não fornecido." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, email } = body;

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
export async function DELETE({ params }: any) {
  try {
    const id = (await params).id;

    if (!id) {
      return NextResponse.json(
        { error: "ID do usuário não fornecido." },
        { status: 400 }
      );
    }

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
