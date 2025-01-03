import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();

  const service = await prisma.service.update({
    where: { id: await params.id },
    data,
  });

  return NextResponse.json(service);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.service.delete({
    where: { id: await params.id },
  });

  return NextResponse.json({ message: "Serviço deletado." });
}
