import { Expense, Sale } from "@prisma/client";
import { salonData } from "../../../types/db";

import Profit from "../charts/profit";
import CustomerTabs from "./dashboard-customer";

type SalonDashboardType = {
  salon: salonData;
};

const mockSales: Sale[] = [
  {
    id: "sale1",
    salonId: "salon123",
    customerId: "customer456",
    professionalId: "professional789",
    totalAmount: 150.0,
    paymentMethod: "credit_card",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "sale2",
    salonId: "salon123",
    customerId: "customer789",
    professionalId: "professional456",
    totalAmount: 200.0,
    paymentMethod: "pix",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "sale3",
    salonId: "salon123",
    customerId: "customer789",
    professionalId: "professional456",
    totalAmount: 100.0,
    paymentMethod: "pix",
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-05"),
  },
  {
    id: "sale4",
    salonId: "salon123",
    customerId: "customer789",
    professionalId: "professional456",
    totalAmount: 50.0,
    paymentMethod: "pix",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    id: "sale5",
    salonId: "salon123",
    customerId: "customer789",
    professionalId: "professional456",
    totalAmount: 300.0,
    paymentMethod: "pix",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "sale6",
    salonId: "salon123",
    customerId: "customer789",
    professionalId: "professional456",
    totalAmount: 250.0,
    paymentMethod: "pix",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
  },
];
const mockExpenses: Expense[] = [
  {
    id: "1",
    description: "Compra de produtos para salão",
    amount: 250.75,
    date: new Date("2024-01-12"),
    categoryId: "sfaf",
    salonId: "asfasf",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "2",
    description: "Pagamento de aluguel",
    amount: 1200.0,
    date: new Date("2024-01-10"),
    categoryId: "aluguel123",
    salonId: "asfasf",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    description: "Café e lanches para equipe",
    amount: 45.5,
    date: new Date("2024-02-09"),
    categoryId: "alimentacao456",
    salonId: "asfasf",
    createdAt: new Date("2024-02-09"),
    updatedAt: new Date("2024-02-09"),
  },
  {
    id: "4",
    description: "Comissão por serviço de morena iluminada",
    amount: 300.0,
    date: new Date("2024-02-08"),
    categoryId: "comissao789",
    salonId: "asfasf",
    createdAt: new Date("2024-02-08"),
    updatedAt: new Date("2024-02-08"),
  },
  {
    id: "5",
    description: "Taxa de máquina de cartão",
    amount: 25.0,
    date: new Date("2024-03-07"),
    categoryId: "taxas987",
    salonId: "asfasf",
    createdAt: new Date("2024-03-07"),
    updatedAt: new Date("2024-03-07"),
  },
  {
    id: "6",
    description: "Manutenção de equipamentos",
    amount: 150.0,
    date: new Date("2024-03-20"),
    categoryId: "manutencao123",
    salonId: "asfasf",
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-03-20"),
  },
];

export async function SalonDashBoard({ salon }: SalonDashboardType) {
  return (
    <div className="py-6 w-full ">
      <h1 className="text-2xl font-bold mb-4">{salon.name} - Dashboard</h1>
      <p className="text-md text-gray-600 mb-6">
        {salon.address}, {salon.city} - CEP: {salon.cep}
      </p>
      <div className="flex flex-col lg:flex-row gap-3 lg:max-h-[660px] w-full ">
        <Profit expenses={mockExpenses} revenue={mockSales} />
        <CustomerTabs customers={salon.customers} />
      </div>
    </div>
  );
}
