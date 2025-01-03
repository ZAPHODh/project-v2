import { ApexOptions } from "apexcharts";

export const getMainChartOptions = (isDarkMode: boolean): ApexOptions => {
  const mainChartColors = isDarkMode
    ? {
        borderColor: "#374151",
        labelColor: "#9CA3AF",
        opacityFrom: 0,
        opacityTo: 0.15,
      }
    : {
        borderColor: "#F3F4F6",
        labelColor: "#6B7280",
        opacityFrom: 0.45,
        opacityTo: 0,
      };

  return {
    chart: {
      height: 420,
      type: "area",
      fontFamily: "Inter, sans-serif",
      foreColor: mainChartColors.labelColor,
      toolbar: { show: false },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: mainChartColors.opacityFrom,
        opacityTo: mainChartColors.opacityTo,
      },
    },
    dataLabels: { enabled: false },
    tooltip: {
      style: { fontSize: "14px", fontFamily: "Inter, sans-serif" },
    },
    grid: {
      borderColor: mainChartColors.borderColor,
      strokeDashArray: 1,
      padding: { left: 35, bottom: 15 },
    },
    xaxis: {
      categories: [
        "01 Feb",
        "02 Feb",
        "03 Feb",
        "04 Feb",
        "05 Feb",
        "06 Feb",
        "07 Feb",
      ],
      labels: {
        style: {
          colors: mainChartColors.labelColor,
          fontSize: "14px",
          fontWeight: 500,
        },
      },
      axisBorder: { color: mainChartColors.borderColor },
      axisTicks: { color: mainChartColors.borderColor },
    },
    yaxis: {
      labels: {
        style: {
          colors: mainChartColors.labelColor,
          fontSize: "14px",
          fontWeight: 500,
        },
        formatter: (value) => `$${value}`,
      },
    },
    legend: {
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "Inter, sans-serif",
      labels: { colors: mainChartColors.labelColor },
    },
  };
};
