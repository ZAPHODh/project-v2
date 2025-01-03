"use client";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

import Chart from "react-apexcharts";

import { getStartDate } from "@/lib/utils/getStartDate";
import { updateChart } from "@/lib/utils/updateChart";

export default function Profit() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Ultimos 7 dias");
  const [revenue, setRevenue] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [profitMargin, setProfitMargin] = useState<number>(0);
  const [chartOptions, setChartOptions] = useState<ApexOptions>({
    series: [
      {
        name: "Receita",
        color: "#31C48D",
        data: [],
      },
      {
        name: "Despesa",
        data: [],
        color: "#F05252",
      },
    ],
    chart: {
      sparkline: {
        enabled: false,
      },
      type: "bar",
      width: "100%",
      height: 400,
      toolbar: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
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
    legend: {
      show: true,
      position: "bottom",
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (value: number) {
          return "$" + value;
        },
      },
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
        },
        formatter: (value: string) => {
          const numericValue = parseFloat(value);
          return isNaN(numericValue) ? value : `$${numericValue}`;
        },
      },
      categories: [],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
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
  });

  const options = ["Ultimos 7 dias", "Ultimos 30 dias", "Ultimo Ano"];

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    setIsOpen((toggle) => !toggle);
  };

  const fetchData = async (period: string) => {
    const startDate = getStartDate(period);
    const endDate = new Date().toISOString();

    try {
      const response = await fetch("/api/financial-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate }),
      });

      if (!response.ok) throw new Error("Erro ao buscar dados");

      const data = await response.json();
      const calculatedProfit = data.revenue - data.expenses;
      const calculatedProfitMargin = (calculatedProfit / data.revenue) * 100;

      const chartConfig = updateChart(period, data);
      setProfitMargin(calculatedProfitMargin);
      setChartOptions({
        series: [
          { name: "Receita", data: chartConfig.revenueData },
          { name: "Despesa", data: chartConfig.expenseData },
        ],
        xaxis: { categories: chartConfig.categories },
      });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedPeriod);
  }, [selectedPeriod]);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Lucro
          </dt>
          <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
            R${(revenue - expenses).toFixed(2)}
          </dd>
        </dl>
        <div>
          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
            <svg
              className="w-2.5 h-2.5 me-1.5"
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
            Margem de lucro {isNaN(profitMargin) ? 0 : profitMargin.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 py-3">
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Receita
          </dt>
          <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400">
            ${revenue.toFixed()}
          </dd>
        </dl>
        <dl>
          <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Despesa
          </dt>
          <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">
            -${expenses.toFixed(2)}
          </dd>
        </dl>
      </div>

      <div id="bar-chart">
        <Chart
          options={chartOptions}
          series={chartOptions.series}
          type="bar"
          height={400}
        />
      </div>
      <div className="relative grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="lastDaysdropdown"
            data-dropdown-placement="bottom"
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
            type="button"
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          >
            {selectedPeriod}
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
          {isOpen && (
            <div className="absolute top-[50px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                {options.map((option) => (
                  <li
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    key={option}
                    onClick={() => handlePeriodChange(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <a
            href="#"
            className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
          >
            Relatório
            <svg
              className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
