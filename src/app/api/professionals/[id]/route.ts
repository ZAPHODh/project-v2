import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

// GET
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

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

// PUT (ou PATCH)
export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

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

// DELETE
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID do profissional não fornecido." },
      { status: 400 }
    );
  }

  await prisma.professional.delete({ where: { id } });
  return NextResponse.json({ message: "Profissional deletado." });
}
