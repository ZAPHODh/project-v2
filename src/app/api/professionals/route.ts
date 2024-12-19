import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET() {
  const professionals = await prisma.professional.findMany();
  return NextResponse.json(professionals);
}

export async function POST(req: Request) {
  const data = await req.json();
  const professional = await prisma.professional.create({ data });
  return NextResponse.json(professional, { status: 201 });
}
