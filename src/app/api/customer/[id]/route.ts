import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      sales: true,
      appointments: {
        include: {
          service: true,
          professional: true,
        },
      },
      services: true,
    },
  });
  if (!customer)
    return NextResponse.json(
      { error: "Cliente não encontrado." },
      { status: 404 }
    );
  return NextResponse.json(customer);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const data = await req.json();

  const customer = await prisma.customer.update({
    where: { id },
    data,
  });
  return NextResponse.json(customer);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  await prisma.customer.delete({ where: { id } });
  return NextResponse.json({ message: "Cliente deletado." });
}
