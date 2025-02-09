import { FinanceTable } from "@/components/finance/finance-table";
import {
  getExpenses,
  getExpensesCategory,
  getSales,
} from "@/lib/data/api-data";

export default async function FinancePage() {
  const expenses = await getExpenses();
  const sales = await getSales();
  const finances = [...expenses, ...sales].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const categories = await getExpensesCategory();
  return (
    <FinanceTable
      finances={finances}
      expenseCategories={categories}
    ></FinanceTable>
  );
}
