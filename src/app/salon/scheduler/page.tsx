import { Schedule } from "@/components/scheduler/schedule";
import {
  getAppointments,
  getProfessionals,
  getServices,
} from "@/lib/data/api-data";
import { Service } from "@prisma/client";
import { redirect } from "next/navigation";

export default async function SchedulePage() {
  const professionals = await getProfessionals();
  if (professionals.length === 0) redirect("/salon/professionals");

  const services = await getServices();
  const appointments = await getAppointments();

  return (
    <>
      <Schedule
        professionals={professionals}
        appointments={appointments}
        services={services as Service[]}
      />
    </>
  );
}
