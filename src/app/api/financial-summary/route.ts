import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function POST(req: NextRequest) {
  const { startDate, endDate } = await req.json();

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const totalRevenue = await prisma.sale.aggregate({
      _sum: { totalAmount: true },
      where: { createdAt: { gte: start, lte: end } },
    });

    const totalExpenses = await prisma.expense.aggregate({
      _sum: { amount: true },
      where: { createdAt: { gte: start, lte: end } },
    });

    const dailyRevenue = await prisma.sale.groupBy({
      by: ["createdAt"],
      _sum: { totalAmount: true },
      where: { createdAt: { gte: start, lte: end } },
      orderBy: { createdAt: "asc" },
    });

    const dailyExpenses = await prisma.expense.groupBy({
      by: ["createdAt"],
      _sum: { amount: true },
      where: { createdAt: { gte: start, lte: end } },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({
      revenue: totalRevenue._sum.totalAmount || 0,
      expenses: totalExpenses._sum.amount || 0,
      dailyRevenue: dailyRevenue.map((entry) => ({
        createdAt: entry.createdAt,
        _sum: { amount: entry._sum.totalAmount || 0 },
      })),
      dailyExpenses: dailyExpenses.map((entry) => ({
        createdAt: entry.createdAt,
        _sum: { amount: entry._sum.amount || 0 },
      })),
    });
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar dados" },
      { status: 404 }
    );
  }
}
