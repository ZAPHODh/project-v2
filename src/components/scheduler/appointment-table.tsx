"use client";

import { Table } from "flowbite-react";
import { ProfessionalData } from "../../../types/db";
import { formatTime } from "@/lib/utils/formatTime";

type AppointmentTableType = {
  date: Date;
  professionals: ProfessionalData[];
  appointments: {
    professionalName: string;
    id: string;
    professionalId: string;
    time: string;
    clientName: string;
  }[];
  onAppointmentCreate: (time: string, professionalId: string) => void;
};

export function AppointmentTable({
  date,
  professionals,
  appointments,
  onAppointmentCreate,
}: AppointmentTableType) {
  const generateTimeSlots = () => {
    const slots = [];
    const startTime = new Date(date.setHours(8, 0, 0, 0));
    const endTime = new Date(date.setHours(18, 0, 0, 0));

    for (
      let time = new Date(startTime);
      time <= endTime;
      time.setMinutes(time.getMinutes() + 30)
    ) {
      slots.push(new Date(time));
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell
            key="time"
            className="w-6 text-center bg-gray-100 font-bold"
          >
            Horário
          </Table.HeadCell>
          {professionals.map((professional) => (
            <Table.HeadCell
              key={professional.id}
              className="w-48 text-center bg-gray-100 font-bold"
            >
              {professional.name}
            </Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {timeSlots.map((slot) => (
            <Table.Row key={`row-${slot.toISOString()}`}>
              <Table.Cell
                key={`time-cell-${slot.toISOString()}`}
                className="font-medium w-6 text-center"
              >
                {formatTime(slot)}
              </Table.Cell>
              {professionals.map((professional) => {
                const appointment = appointments.find(
                  (appt) =>
                    appt.professionalId === professional.id &&
                    new Date(appt.time).toISOString() === slot.toISOString()
                );
                return (
                  <Table.Cell
                    key={`cell-${professional.id}-${slot.toISOString()}`}
                    className={`cursor-pointer w-48 text-center ${
                      appointment
                        ? "bg-blue-200 text-blue-800 rounded"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() =>
                      !appointment &&
                      onAppointmentCreate(slot.toISOString(), professional.id)
                    }
                  >
                    {appointment ? appointment.clientName : ""}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
