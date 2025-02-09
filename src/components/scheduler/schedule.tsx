"use client";

import { AppointmentData, ProfessionalData } from "../../../types/db";
import { Popover, Table } from "flowbite-react";
import { SchedulerConsole } from "./scheduler-console";
import { useState } from "react";
import { NewAppointment } from "./new-appointment";
import { ModalProvider } from "@/lib/context/modal-context";
import { Service } from "@prisma/client";
import { UpdateAppointment } from "./update-appointment";
import { PopoverContent } from "../popoverContent";

type ScheduleType = {
  professionals: ProfessionalData[];
  appointments: AppointmentData[];
  services: Service[];
};

export function Schedule({
  professionals = [],
  appointments = [],
  services = [],
}: ScheduleType) {
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [cachedAppointments, setCachedAppointments] = useState(appointments);
  const [selectedProfessional, setSelectedProfessional] = useState<
    ProfessionalData | "all"
  >("all");

  const [newAppoinmentData, setNewAppoinmentData] = useState<{
    modal: boolean;
    professionalId?: string;
    time?: string;
  }>({ modal: false });

  const [updateAppointmentData, setUpdateAppointmentData] = useState<{
    modal: boolean;
    appointment: AppointmentData | null;
  }>({ modal: false, appointment: null });
  function handleDateChange(date: Date | null) {
    if (!date) return;
    setDate(date);
  }

  const onAppointmentCreate = (time: string, professionalId: string) => {
    setNewAppoinmentData((prevAppointment) => ({
      ...prevAppointment,
      modal: true,
      professionalId,
      time,
    }));
  };
  const handleSave = (appointment: AppointmentData) => {
    setCachedAppointments((prevAppointments) => [
      ...prevAppointments,
      appointment,
    ]);
  };
  const handleSaveUpdate = (appointment: AppointmentData) => {
    setCachedAppointments((prevAppointments) =>
      prevAppointments.map((app) =>
        app.id === appointment.id ? appointment : app
      )
    );
  };
  const onAppointmentUpdate = (appointment: AppointmentData) => {
    setUpdateAppointmentData({ modal: true, appointment });
  };

  const handleExport = (to: "google" | "ios") => {
    const filteredAppointments = cachedAppointments.filter((appt) =>
      filteredProfessionals.some((prof) => prof.id === appt.professionalId)
    );

    if (to === "google") {
      filteredAppointments.map(({ date, customer, professional }) => {
        const startTime = new Date(date)
          .toISOString()
          .replace(/-|:|\.\d+/g, "");
        const endTime = new Date(new Date(date).getTime() + 3600000)
          .toISOString()
          .replace(/-|:|\.\d+/g, "");

        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Serviço com ${customer.name}&dates=${startTime}/${endTime}&details=Profissional: ${professional.name}&sf=true&output=xml`;
        window.open(url, "_blank");
      });
    } else if (to === "ios") {
      const icsContent = `
        BEGIN:VCALENDAR
        VERSION:2.0
        CALSCALE:GREGORIAN
        ${filteredAppointments
          .map(({ date, customer, professionalId }) => {
            const startTime = new Date(date)
              .toISOString()
              .replace(/-|:|\.\d+/g, "");
            const endTime = new Date(new Date(date).getTime() + 3600000)
              .toISOString()
              .replace(/-|:|\.\d+/g, "");

            return `
        BEGIN:VEVENT
        SUMMARY:Serviço com ${customer.name}
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
        <Table className="border-collapse">
          <Table.Head>
            <Table.HeadCell
              key="time"
              className="w-6 text-center bg-gray-100 font-bold border border-gray-300 dark:border-gray-700"
            >
              Horário
            </Table.HeadCell>
            {filteredProfessionals.map((professional) => (
              <Table.HeadCell
                key={professional.id}
                className="w-48 text-center bg-gray-100 font-bold border border-gray-300 dark:border-gray-700"
              >
                {professional.name}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {timeSlots.map((slot) => (
              <Table.Row
                key={`row-${slot.toISOString()}`}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell
                  key={`time-cell-${slot.toISOString()}`}
                  className="font-medium w-6 text-center border border-gray-300 dark:border-gray-700"
                >
                  {formatTime(slot)}
                </Table.Cell>
                {filteredProfessionals.map((professional) => {
                  const appointment = cachedAppointments.find(
                    (appt) =>
                      appt.professionalId === professional.id &&
                      new Date(appt.date).toISOString() === slot.toISOString()
                  );
                  return (
                    <Table.Cell
                      key={`cell-${professional.id}-${slot.toISOString()}`}
                      className={`cursor-pointer w-48 text-center border border-gray-300 dark:border-gray-700 transition-all duration-300 ease-in-out ${
                        appointment
                          ? {
                              pending:
                                "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 dark:from-yellow-800 dark:to-yellow-900 dark:text-yellow-200 shadow-md hover:from-yellow-200 hover:to-yellow-300 dark:hover:from-yellow-900 dark:hover:to-yellow-800 hover:shadow-lg",
                              confirmed:
                                "bg-gradient-to-r from-green-100 to-green-200 text-green-800 dark:from-green-800 dark:to-green-900 dark:text-green-200 shadow-md hover:from-green-200 hover:to-green-300 dark:hover:from-green-900 dark:hover:to-green-800 hover:shadow-lg",
                              canceled:
                                "bg-gradient-to-r from-red-100 to-red-200 text-red-800 dark:from-red-800 dark:to-red-900 dark:text-red-200 shadow-md hover:from-red-200 hover:to-red-300 dark:hover:from-red-900 dark:hover:to-red-800 hover:shadow-lg",
                              completed:
                                "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 dark:from-blue-800 dark:to-blue-900 dark:text-blue-200 shadow-md hover:from-blue-200 hover:to-blue-300 dark:hover:from-blue-900 dark:hover:to-blue-800 hover:shadow-lg",
                            }[appointment.status] ||
                            "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-md hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-900 dark:hover:to-gray-800 hover:shadow-lg"
                          : "hover:bg-gradient-to-r from-gray-100 to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-900"
                      }`}
                      onClick={() =>
                        !appointment
                          ? onAppointmentCreate(
                              slot.toISOString(),
                              professional.id
                            )
                          : onAppointmentUpdate(appointment)
                      }
                    >
                      {appointment ? (
                        <Popover
                          trigger="hover"
                          content={
                            <PopoverContent
                              content={appointment.notes || "Sem notas"}
                              title="Notas"
                            />
                          }
                          placement="top"
                        >
                          <span className=" h-full">
                            {appointment.customer.name}
                          </span>
                        </Popover>
                      ) : (
                        ""
                      )}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {newAppoinmentData.modal && (
        <ModalProvider
          close={() =>
            setNewAppoinmentData((prevAppointmentData) => ({
              ...prevAppointmentData,
              modal: false,
            }))
          }
        >
          <NewAppointment
            appointmnetData={{
              date: newAppoinmentData.time,
              professionalId: newAppoinmentData.professionalId,
            }}
            onSave={handleSave}
            services={services}
          />
        </ModalProvider>
      )}
      {updateAppointmentData.modal && updateAppointmentData.appointment && (
        <ModalProvider
          close={() =>
            setUpdateAppointmentData((prevAppointmentData) => ({
              ...prevAppointmentData,
              modal: false,
              appointment: null,
            }))
          }
        >
          <UpdateAppointment
            appointment={updateAppointmentData.appointment}
            onSave={handleSaveUpdate}
            services={services}
          />
        </ModalProvider>
      )}
    </div>
  );
}
