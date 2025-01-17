import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const professional = await prisma.professional.findUnique({
    where: { id: await params.id },
    include: {
      sales: {
        include: {
          items: true,
        },
      },
    },
  });
  if (!professional)
    return NextResponse.json(
      { error: "Profissional não encontrado." },
      { status: 404 }
    );
  return NextResponse.json(professional);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const professional = await prisma.professional.update({
    where: { id: await params.id },
    data,
  });
  return NextResponse.json(professional);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.professional.delete({ where: { id: await params.id } });
  return NextResponse.json({ message: "Profissional deletado." });
}
