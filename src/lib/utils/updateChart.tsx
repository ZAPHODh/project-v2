export const updateChart = (
  period: string,
  data: {
    revenue: number;
    expenses: number;
    dailyRevenue: {
      createdAt: Date;
      _sum: { amount: number };
    }[];
    dailyExpenses: {
      createdAt: Date;
      _sum: { amount: number };
    }[];
  }
) => {
  switch (period) {
    case "Ultimos 7 dias":
      return {
        categories: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
        revenueData: data.dailyRevenue
          .slice(0, 7)
          .map((item) => item._sum.amount || 0),
        expenseData: data.dailyExpenses
          .slice(0, 7)
          .map((item) => item._sum.amount || 0),
      };
    case "Ultimos 30 dias":
      return {
        categories: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
        revenueData: data.dailyRevenue
          .slice(0, 30)
          .map((item) => item._sum.amount || 0),
        expenseData: data.dailyExpenses
          .slice(0, 30)
          .map((item) => item._sum.amount || 0),
      };
    case "Ultimo Ano":
      return {
        categories: [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ],
        revenueData: data.dailyRevenue
          .slice(0, 12)
          .map((item) => item._sum.amount || 0),
        expenseData: data.dailyExpenses
          .slice(0, 12)
          .map((item) => item._sum.amount || 0),
      };
    default:
      return { categories: [], revenueData: [], expenseData: [] };
  }
};
