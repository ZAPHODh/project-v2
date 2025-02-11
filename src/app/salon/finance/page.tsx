import { FinanceTable } from "@/components/finance/finance-table";
import { auth } from "@/lib/auth/auth";
import {
  getExpenses,
  getExpensesCategory,
  getProfessionals,
  getSales,
  getServices,
} from "@/lib/data/api-data";
import { redirect } from "next/navigation";

export default async function FinancePage() {
  const session = await auth();
  if (!session) return redirect("/login");
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
