import ServiceTable from "@/components/services/service-table";
import UpgradeBanner from "@/components/upgrade-banner";
import { auth } from "@/lib/auth/auth";
import { getServices } from "@/lib/data/api-data";
import { redirect } from "next/navigation";

export default async function ServicePage() {
  const session = await auth();
  if (!session) redirect("/login");

  const services = await getServices();
  return (
    <div className="w-full flex flex-col mx-auto max-w-screen px-4 ">
      <ServiceTable services={services} />
      {!session.subscriptionRole && <UpgradeBanner />}
    </div>
  );
}
