import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const expenseCategory = await prisma.expenseCategory.findUnique({
    where: { id },
    include: {
      expenses: true,
    },
  });
  if (!expenseCategory)
    return NextResponse.json(
      { error: "categoria não encontrada." },
      { status: 404 }
    );
  return NextResponse.json(expenseCategory);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const data = await req.json();

  const expenseCategory = await prisma.expenseCategory.update({
    where: { id },
    data,
  });
  return NextResponse.json(expenseCategory);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  await prisma.expenseCategory.delete({ where: { id } });
  return NextResponse.json({ message: "categoria deletada." });
}
