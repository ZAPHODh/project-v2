// src/mocks/mockData.ts

export const mockRevenueData = {
  _sum: {
    totalAmount: 5000, // Simulando o total de vendas
  },
};

export const mockExpenseData = {
  _sum: {
    amount: 2000, // Simulando o total de despesas
  },
};

export const mockDailyRevenue = [
  {
    createdAt: "2024-12-01T00:00:00.000Z",
    _sum: {
      totalAmount: 1000,
    },
  },
  {
    createdAt: "2024-12-02T00:00:00.000Z",
    _sum: {
      totalAmount: 1200,
    },
  },
  // Adicione mais dias conforme necessário
];

export const mockDailyExpenses = [
  {
    createdAt: "2024-12-01T00:00:00.000Z",
    _sum: {
      amount: 500,
    },
  },
  {
    createdAt: "2024-12-02T00:00:00.000Z",
    _sum: {
      amount: 700,
    },
  },
  // Adicione mais dias conforme necessário
];
