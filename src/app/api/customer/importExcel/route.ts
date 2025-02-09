import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";
import * as XLSX from "xlsx";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const salonId = formData.get("salon") as string;

  if (!file) {
    return NextResponse.json(
      { error: "Nenhum arquivo enviado" },
      { status: 400 }
    );
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawData = XLSX.utils.sheet_to_json(sheet);

  if (!rawData || rawData.length === 0) {
    return NextResponse.json(
      { error: "Arquivo vazio ou inválido" },
      { status: 400 }
    );
  }
  const customers = rawData
    .map((customer: any) => ({
      name: customer.name?.trim() || "",
      email: customer.email?.trim() || null,
      city: customer.city ? String(customer.city).trim() : "",
      address: customer.address ? String(customer.address).trim() : "",
      phone: customer.phone ? String(customer.phone).trim() : "",
      birthDay: customer.birthDay ? parseDate(customer.birthDay) : null,
      salonId,
    }))
    .filter((c) => c.name && c.email);

  if (customers.length === 0) {
    return NextResponse.json(
      { error: "Nenhum dado válido encontrado" },
      { status: 400 }
    );
  }
  try {
    const newCustomers = await prisma.customer.createMany({
      data: customers,
      skipDuplicates: true,
    });

    return NextResponse.json({ newCustomers }, { status: 200 });
  } catch (error) {
    console.error("Erro durante a importação:", error);
    return NextResponse.json({ error: "Falha na importação" }, { status: 500 });
  }
}
import { parse } from "date-fns";

const parseDate = (date: string) => {
  try {
    return parse(date, "dd/MM/yyyy", new Date());
  } catch {
    return null;
  }
};
