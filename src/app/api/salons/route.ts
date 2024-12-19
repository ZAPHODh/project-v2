import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET() {
  const salons = await prisma.salon.findMany();
  return NextResponse.json(salons);
}

export async function POST(req: Request) {
  const data = await req.json();
  const salon = await prisma.salon.create({ data });
  return NextResponse.json(salon, { status: 201 });
}
