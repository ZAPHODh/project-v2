"use client";

import { ProfessionalData } from "../../../types/db";
import { Table } from "flowbite-react";
import { SchedulerConsole } from "./scheduler-console";
import { useState } from "react";

type ScheduleType = {
  professionals: ProfessionalData[];
  appointments: {
    professionalName: string;
    id: string;
    professionalId: string;
    time: string;
    clientName: string;
  }[];
};

export function Schedule({
  professionals = [],
  appointments = [],
}: ScheduleType) {
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [selectedProfessional, setSelectedProfessional] = useState<
    ProfessionalData | "all"
  >("all");

  function handleDateChange(date: Date | null) {
    if (!date) return;
    setDate(date);
  }

  const onAppointmentCreate = (time: string, professionalId: string) => {
    console.log(
      `Creating appointment for professionalId: ${professionalId} at ${time}`
    );
  };

  const onAppointmentUpdate = (
    appointmentId: string,
    newTime: string,
    newProfessionalId: string
  ) => {
    console.log(
      `Updating appointment ${appointmentId} to new time: ${newTime}, new professionalId: ${newProfessionalId}`
    );
  };

  const handleExport = (to: "google" | "ios") => {
    const filteredAppointments = appointments.filter((appt) =>
      filteredProfessionals.some((prof) => prof.id === appt.professionalId)
    );

    if (to === "google") {
      filteredAppointments.map(({ time, clientName, professionalName }) => {
        const startTime = new Date(time)
          .toISOString()
          .replace(/-|:|\.\d+/g, "");
        const endTime = new Date(new Date(time).getTime() + 3600000)
          .toISOString()
          .replace(/-|:|\.\d+/g, "");

        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Serviço com ${clientName}&dates=${startTime}/${endTime}&details=Profissional: ${professionalName}&sf=true&output=xml`;
        window.open(url, "_blank");
      });
    } else if (to === "ios") {
      const icsContent = `
        BEGIN:VCALENDAR
        VERSION:2.0
        CALSCALE:GREGORIAN
        ${filteredAppointments
          .map(({ time, clientName, professionalId }) => {
            const startTime = new Date(time)
              .toISOString()
              .replace(/-|:|\.\d+/g, "");
            const endTime = new Date(new Date(time).getTime() + 3600000)
              .toISOString()
              .replace(/-|:|\.\d+/g, "");

            return `
        BEGIN:VEVENT
        SUMMARY:Serviço com ${clientName}
        DTSTART:${startTime}
        DTEND:${endTime}
        DESCRIPTION:Profissional: ${professionalId}
        END:VEVENT
            `.trim();
          })
          .join("\n")}
        END:VCALENDAR
      `.trim();

      const blob = new Blob([icsContent], {
        type: "text/calendar;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "agenda.ics";
      link.click();

      URL.revokeObjectURL(url);
    }
  };

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

  const formatTime = (time: Date) =>
    time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  const handleSelectedProfessional = (
    professional: ProfessionalData | "all"
  ) => {
    setSelectedProfessional(professional);
  };

  const filteredProfessionals =
    selectedProfessional === "all"
      ? professionals
      : professionals.filter(
          (professional) => professional.id === selectedProfessional.id
        );

  return (
    <div
      className={`w-full ${
        filteredProfessionals.length === 1 ? "max-w-md mx-auto" : "max-w-full"
      }`}
    >
      <SchedulerConsole
        handleDateChange={handleDateChange}
        professionals={professionals}
        selectedProfessional={handleSelectedProfessional}
        selectedExport={handleExport}
      />
      <div className={`overflow-x-auto`}>
        <Table>
          <Table.Head>
            <Table.HeadCell
              key="time"
              className="w-6 text-center bg-gray-100 font-bold"
            >
              Horário
            </Table.HeadCell>
            {filteredProfessionals.map((professional) => (
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
              <Table.Row
                key={`row-${slot.toISOString()}`}
                className=" bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell
                  key={`time-cell-${slot.toISOString()}`}
                  className=" font-medium w-6 text-center"
                >
                  {formatTime(slot)}
                </Table.Cell>
                {filteredProfessionals.map((professional) => {
                  const appointment = appointments.find(
                    (appt) =>
                      appt.professionalId === professional.id &&
                      new Date(appt.time).toISOString() === slot.toISOString()
                  );
                  return (
                    <Table.Cell
                      key={`cell-${professional.id}-${slot.toISOString()}`}
                      className={`cursor-pointer w-48 text-center  ${
                        appointment
                          ? "bg-blue-200 text-blue-800 dark:bg-gray-900 dark:text-white rounded"
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
    </div>
  );
}
