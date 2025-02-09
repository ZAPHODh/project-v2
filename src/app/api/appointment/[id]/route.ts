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

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const data = await req.json();

  const id = (await params).id;
  const appointment = await prisma.appointment.update({
    where: { id },
    data,
    include: {
      professional: true,
      customer: true,
      service: true,
    },
  });
  console.log(appointment);
  return NextResponse.json(appointment);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.professional.delete({ where: { id: await params.id } });
  return NextResponse.json({ message: "Profissional deletado." });
}
