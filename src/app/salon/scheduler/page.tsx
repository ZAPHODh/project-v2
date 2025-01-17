import { Schedule } from "@/components/scheduler/schedule";
import { getProfessionals } from "@/lib/data/api-data";

export default async function SchedulePage() {
  const professionals = await getProfessionals();
  const mockAppointments = [
    {
      id: "1",
      professionalId: professionals[0].id,
      professionalName: professionals[0].name,
      time: "2025-01-09T09:00:00.000Z",
      clientName: "Alice Johnson",
    },
    {
      id: "2",
      professionalName: professionals[0].name,
      professionalId: professionals[0].id,
      time: "2025-01-09T10:00:00.000Z",
      clientName: "Bob Smith",
    },
    {
      id: "3",
      professionalName: professionals[0].name,
      professionalId: professionals[0].id,
      time: "2025-01-09T09:30:00.000Z",
      clientName: "Clara Davis",
    },
    {
      id: "4",
      professionalName: professionals[0].name,
      professionalId: professionals[0].id,
      time: "2025-01-09T11:00:00.000Z",
      clientName: "Daniel Lewis",
    },
    {
      id: "5",
      professionalName: professionals[0].name,
      professionalId: professionals[0].id,
      time: "2025-01-09T10:30:00.000Z",
      clientName: "Eva Martinez",
    },
    {
      id: "6",
      professionalName: professionals[0].name,
      professionalId: professionals[0].id,
      time: "2025-01-09T12:00:00.000Z",
      clientName: "Frank Wilson",
    },
  ];
  return (
    <>
      <Schedule professionals={professionals} appointments={mockAppointments} />
    </>
  );
}
