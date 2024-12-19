import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service)
    return NextResponse.json(
      { error: "Serviço não encontrado." },
      { status: 404 }
    );
  return NextResponse.json(service);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const service = await prisma.service.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(service);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.service.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Serviço deletado." });
}
