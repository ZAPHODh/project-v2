import { CustomerTable } from "@/components/customer/customers-table";
import { getCustomers } from "@/lib/data/api-data";

export default async function CustomersPage() {
  const customers = await getCustomers();
  return <CustomerTable customers={customers} />;
}
