"use client";
import { Expense, Sale } from "@prisma/client";
import { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { format } from "date-fns"; // Importando o date-fns

type ProfitType = {
  expenses: Expense[];
  revenue: Sale[];
};

export default function Profit({ expenses, revenue }: ProfitType) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Últimos 7 dias");
  const { theme } = useTheme();

  const groupDataByMonth = (data: (Expense | Sale)[], isExpense: boolean) => {
    const groupedData: { [key: string]: number } = {};

    data.forEach((item) => {
      const date = new Date(item.createdAt);
      const month = format(date, "MMM");

      if (!groupedData[month]) {
        groupedData[month] = 0;
      }

      groupedData[month] += isExpense
        ? (item as Expense).amount
        : (item as Sale).totalAmount;
    });

    return groupedData;
  };

  const revenueByMonth = groupDataByMonth(revenue, false);
  const expensesByMonth = groupDataByMonth(expenses, true);

  const months = Object.keys(revenueByMonth);
  const revenueData = months.map((month) => revenueByMonth[month]);
  const expensesData = months.map((month) => expensesByMonth[month]);

  const totalRevenue = revenue.reduce((acc, sale) => acc + sale.totalAmount, 0);
  const totalExpenses = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const profitMargin =
    totalRevenue > 0
      ? ((totalRevenue - totalExpenses) / totalRevenue) * 100
      : 0;

  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    series: [
      { name: "Receita", color: "#31C48D", data: revenueData },
      { name: "Despesa", color: "#F05252", data: expensesData },
    ],
    chart: {
      sparkline: {
        enabled: false,
      },
      type: "bar",
      height: 400,
      width: "100%",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "100%",
        borderRadiusApplication: "end",
        borderRadius: 6,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: months,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
        formatter: (value) => {
          const numericValue = Number(value);
          return `R$${numericValue.toFixed(2)}`;
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
      },
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -20,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: `${theme}`,
      followCursor: true,
      y: { formatter: (value: number) => `R$${value.toFixed(2)}` },
    },
    fill: {
      opacity: 1,
    },
  });

  useEffect(() => {
    setChartOptions((prevCharts) => ({ ...prevCharts, tooltip: { theme } }));
  }, [theme]);

  const options = ["Últimos 7 dias", "Últimos 30 dias", "Último Ano"];

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 max-h-[660px]">
      <div className="flex gap-2 items-center justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Lucro
          </dt>
          <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
            R${(totalRevenue - totalExpenses).toFixed(2)}
          </dd>
        </dl>
        <div className="pt-3">
          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
            <svg className="w-2.5 h-2.5 me-1.5" viewBox="0 0 10 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
            Margem de lucro {profitMargin.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 py-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Receita
          </dt>
          <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400">
            R${totalRevenue.toFixed(2)}
          </dd>
        </dl>
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Despesa
          </dt>
          <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">
            -R${totalExpenses.toFixed(2)}
          </dd>
        </dl>
      </div>

      <Chart
        options={chartOptions}
        series={chartOptions.series}
        type="bar"
        height={400}
      />

      <div className="relative grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <button className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2">
            Relatório
            <svg className="w-2.5 h-2.5 ms-1.5" viewBox="0 0 6 10">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
