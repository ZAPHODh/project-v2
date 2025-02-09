"use client";

import { AppointmentData } from "../../../types/db";
import { Button, Table } from "flowbite-react";
import { FloatingLabel } from "flowbite-react";
import { useEffect, useState } from "react";
type CustomerSchedulerProps = {
  scheduler: AppointmentData[];
};
import { Dropdown } from "flowbite-react";
import {
  exportToExcel,
  exportToImage,
  exportToPDF,
} from "@/lib/utils/exportAppointments";
import Link from "next/link";
export function CustomerScheduler({ scheduler }: CustomerSchedulerProps) {
  const [search, setSearch] = useState<string>();
  const [cachedScheduler, setCachedScheduler] = useState(scheduler);
  useEffect(() => {
    if (!search) {
      setCachedScheduler(scheduler);
      return;
    }

    const lowerSearch = search.toLowerCase();

    const filtered = scheduler.filter((appointment) => {
      return (
        appointment.service.name.toLowerCase().includes(lowerSearch) ||
        appointment.professional.name.toLowerCase().includes(lowerSearch) ||
        appointment.service.price.toString().includes(lowerSearch) ||
        new Date(appointment.date)
          .toLocaleDateString("pt-BR")
          .includes(lowerSearch)
      );
    });

    setCachedScheduler(filtered);
  }, [search, scheduler]);
  return (
    <>
      <div className="rounded-xl bg-white dark:bg-gray-700 p-4 my-4 flex flex-col lg:flex-row items-center gap-3">
        <div className="flex gap-3 items-center">
          <FloatingLabel
            variant="filled"
            label="Pesquisar"
            className="min-w-md"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Dropdown label="Baixar" dismissOnClick={false}>
            <Dropdown.Item onClick={() => exportToPDF(cachedScheduler)}>
              Formato PDF
            </Dropdown.Item>
            <Dropdown.Item onClick={exportToImage}>
              Formato Imagem
            </Dropdown.Item>
            <Dropdown.Item onClick={() => exportToExcel(cachedScheduler)}>
              Formato Excel
            </Dropdown.Item>
          </Dropdown>
        </div>
        <Button color="gray">
          <Link href={"/salon/scheduler"}>Ir para agenda</Link>
        </Button>
      </div>
      <div className="overflow-x-auto ">
        <Table>
          <Table.Head>
            <Table.HeadCell>Serviço</Table.HeadCell>
            <Table.HeadCell>Profissional</Table.HeadCell>
            <Table.HeadCell>Valor</Table.HeadCell>
            <Table.HeadCell>Data</Table.HeadCell>
            <Table.HeadCell>Finalizado</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {cachedScheduler.map((appointment) => (
              <Table.Row
                key={appointment.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{appointment.service.name}</Table.Cell>
                <Table.Cell>{appointment.professional.name}</Table.Cell>
                <Table.Cell>
                  R$ {appointment.service.price.toFixed(2)}
                </Table.Cell>
                <Table.Cell>
                  {new Date(appointment.date).toLocaleDateString("pt-BR")}
                </Table.Cell>
                <Table.Cell>
                  {appointment.status === "completed" ? "Sim" : "Não"}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
