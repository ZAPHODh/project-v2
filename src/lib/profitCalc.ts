"use server";
import { Professional, Service } from "@prisma/client";
import { prisma } from "../../prisma/prisma";

export const calculateIdealRevenue = async (
  service: Service,
  professional: Professional,
  periodStart: Date,
  periodEnd: Date
): Promise<number> => {
  const durationInMinutes = service.duration;
  const workingHoursPerDay = 8;
  const workingMinutesPerDay = workingHoursPerDay * 60;
  const maxServicesPerDay = Math.floor(
    workingMinutesPerDay / durationInMinutes
  );

  const daysInPeriod = Math.ceil(
    (periodEnd.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24)
  );
  const idealRevenue = maxServicesPerDay * daysInPeriod * service.price;

  return idealRevenue;
};
export const calculateRealRevenue = async (
  serviceId: string,
  periodStart: Date,
  periodEnd: Date
): Promise<number> => {
  const sales = await prisma.saleItem.findMany({
    where: {
      serviceId: serviceId,
      sale: {
        createdAt: {
          gte: periodStart,
          lte: periodEnd,
        },
      },
    },
    include: {
      sale: true,
    },
  });

  const realRevenue = sales.reduce(
    (total, saleItem) => total + saleItem.total,
    0
  );

  return realRevenue;
};
export const calculateTotalCosts = async (
  salonId: string,
  periodStart: Date,
  periodEnd: Date
): Promise<number> => {
  const expenses = await prisma.expense.findMany({
    where: {
      salonId: salonId,
      date: {
        gte: periodStart,
        lte: periodEnd,
      },
    },
  });

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const commissions = await prisma.commission.findMany({
    where: {
      salonId: salonId,
      createdAt: {
        gte: periodStart,
        lte: periodEnd,
      },
    },
  });

  const totalCommissions = commissions.reduce(
    (total, commission) => total + commission.percentage,
    0
  );

  const totalCosts = totalExpenses + totalCommissions;

  return totalCosts;
};
