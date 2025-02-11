import { CustomerTable } from "@/components/customer/customers-table";
import { auth } from "@/lib/auth/auth";
import { getCustomers } from "@/lib/data/api-data";
import { redirect } from "next/navigation";

export default async function CustomersPage() {
  const session = await auth();
  if (!session) return redirect("/login");
  const customers = await getCustomers();
  return <CustomerTable customers={customers} />;
}
