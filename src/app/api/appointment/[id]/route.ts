import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function GET(
  request: NextRequest
  // { params }: { params: Promise<{ id: string }> }
) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  // const id = (await params).id;
  const professional = await prisma.professional.findUnique({
    where: { id: id as string },
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
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const data = await request.json();
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  // const id = (await params).id;

  const appointment = await prisma.appointment.update({
    where: { id: id as string },
    data,
    include: {
      professional: true,
      customer: true,
      service: true,
    },
  });

  return NextResponse.json(appointment);
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  await prisma.professional.delete({ where: { id: id as string } });
  return NextResponse.json({ message: "Profissional deletado." });
}
