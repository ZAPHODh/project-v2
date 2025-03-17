import { ProfitDashboard } from "@/components/profit/profit-dashboard";

import { auth } from "@/lib/auth/auth";
import { getSalon } from "@/lib/data/api-data";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/login");
  const salon = await getSalon();
  if ("message" in salon) redirect("/salon");

  return <ProfitDashboard salonId={salon.id} />;
}
