import { FinanceTable } from "@/components/finance/finance-table";
import {
  getExpenses,
  getExpensesCategory,
  getProfessionals,
  getSales,
  getServices,
} from "@/lib/data/api-data";

export default async function FinancePage() {
  const expenses = await getExpenses();
  const sales = await getSales();
  const finances = [...expenses, ...sales].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const categories = await getExpensesCategory();
  const professionals = await getProfessionals();
  const services = await getServices();
  return (
    <FinanceTable
      finances={finances}
      expenseCategories={categories}
      professionals={professionals}
      services={services}
    ></FinanceTable>
  );
}
