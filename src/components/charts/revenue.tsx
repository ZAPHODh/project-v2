"use client";
import { Sale } from "@prisma/client";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { SalesData } from "../../../types/db";

interface RevenueProps {
  sales: (Sale | SalesData)[];
}

export default function Revenue({ sales }: RevenueProps) {
  const processSalesData = (sales: Sale[]) => {
    const categories = sales.map((sale) => {
      const date = new Date(sale.createdAt);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      });
    });

    const data = sales.map((sale) => sale.totalAmount);

    return { categories, data };
  };

  const { categories, data } = processSalesData(sales);

  const Options: ApexOptions = {
    chart: {
      height: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: "Total Sales",
        data: data,
        color: "#1A56DB",
      },
    ],
    xaxis: {
      categories: categories,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  if (!Options.series || !Options.series.length || !Options.xaxis?.categories) {
    console.error("Missing data for chart options!");
    return <div>Erro ao carregar o Gráfico.</div>;
  }

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            {sales.reduce((acc, sale) => acc + sale.totalAmount, 0).toFixed(2)}
          </h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Total Sales
          </p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
          12%
          <svg
            className="w-3 h-3 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13V1m0 0L1 5m4-4 4 4"
            />
          </svg>
        </div>
      </div>
      <Chart
        options={Options}
        series={Options.series}
        type="area"
        height="100%"
      />
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            id="dropdownDefaultButton"
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button"
          >
            Last 7 days
            <svg
              className="w-2.5 m-2.5 ms-1.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
