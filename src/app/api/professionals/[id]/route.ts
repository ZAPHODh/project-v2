import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  if (!id) {
    return NextResponse.json(
      { error: "ID do profissional não fornecido." },
      { status: 400 }
    );
  }

  const professional = await prisma.professional.findUnique({
    where: { id },
    include: {
      sales: {
        include: {
          items: true,
        },
      },
    },
  });

  if (!professional) {
    return NextResponse.json(
      { error: "Profissional não encontrado." },
      { status: 404 }
    );
  }

  return NextResponse.json(professional);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  if (!id) {
    return NextResponse.json(
      { error: "ID do profissional não fornecido." },
      { status: 400 }
    );
  }

  const data = await request.json();
  const professional = await prisma.professional.update({
    where: { id },
    data,
  });

  return NextResponse.json(professional);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (!id) {
    return NextResponse.json(
      { error: "ID do profissional não fornecido." },
      { status: 400 }
    );
  }

  await prisma.professional.delete({ where: { id } });
  return NextResponse.json({ message: "Profissional deletado." });
}
