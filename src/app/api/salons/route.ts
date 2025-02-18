"use server";

import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { Salon } from "@prisma/client";

export async function GET(req: Request) {
  const userId = req.headers.get("X-User-Id");

  const salon = await prisma.salon.findFirst({
    where: { ownerId: userId as string },
    include: {
      customers: {
        include: {
          appointments: true,
          sales: true,
          services: true,
        },
      },
    },
  });

  if (!salon) {
    return NextResponse.json({ message: "no salon" }, { status: 200 });
  }

  return NextResponse.json(salon);
}

export async function POST(req: Request) {
  const data: Partial<Salon> = await req.json();
  const userId = req.headers.get("X-User-Id");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId as string },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const existingSalon = await prisma.salon.findFirst({
    where: { ownerId: userId as string },
  });

  if (existingSalon) {
    return NextResponse.json(
      { error: "A salon already exists for this owner" },
      { status: 400 }
    );
  }
  const salon = await prisma.salon.create({
    data: {
      name: data.name as string,
      address: data.address as string,
      ownerId: userId as string,
      cep: data.cep as string,
    },
  });

  return NextResponse.json(salon, { status: 201 });
}
