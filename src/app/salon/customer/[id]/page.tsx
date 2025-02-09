import { CustomerPage } from "@/components/customer/customer-page";
import { getCustomer } from "@/lib/data/api-data";

import { redirect } from "next/navigation";

export default async function OneCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const customer = await getCustomer(id);

  if (!customer) {
    redirect("/customers");
  }

  return <CustomerPage customer={customer} />;
}
