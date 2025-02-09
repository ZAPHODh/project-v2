"use client";

import { Tabs } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import { CustomerData } from "../../../types/db";
import { MdSchedule } from "react-icons/md";
import { IoMdListBox } from "react-icons/io";
import { CustomerGeneral } from "./customer-general";
import { CustomerScheduler } from "./customer-scheduler";
type CustomerPageProps = {
  customer: CustomerData;
};
export function CustomerPage({ customer }: CustomerPageProps) {
  return (
    <div className="my-3 w-full px-6 py-3 bg-gray-50 dark:bg-gray-900 text-white rounded-lg shadow-md  dark:border-gray-700">
      <Tabs aria-label="Customer Tabs" variant="underline">
        {/* Aba Geral */}
        <Tabs.Item title="Geral" icon={HiUserCircle} active>
          <CustomerGeneral customer={customer} />
        </Tabs.Item>

        {/* Aba de Agendamentos */}
        <Tabs.Item title="Agendamentos" icon={MdSchedule}>
          {customer.appointments.length > 0 ? (
            <CustomerScheduler scheduler={customer.appointments} />
          ) : (
            <p>Sem agendamentos registrados.</p>
          )}
        </Tabs.Item>

        {/* Aba de Serviços */}
        <Tabs.Item title="Serviços" icon={IoMdListBox}>
          {customer.services.length > 0 ? (
            <ul className="list-disc list-inside space-y-2">
              {customer.services.map((service) => (
                <li key={service.id}>
                  <strong>Serviço:</strong> {service.name}
                  <br />
                  <strong>Descrição:</strong>{" "}
                  {service.description || "Sem descrição"}
                </li>
              ))}
            </ul>
          ) : (
            <p>Sem serviços registrados.</p>
          )}
        </Tabs.Item>

        {/* Aba de Vendas */}
        <Tabs.Item title="Vendas" icon={IoMdListBox}>
          {customer.sales.length > 0 ? (
            <ul className="list-disc list-inside space-y-2">
              {customer.sales.map((sale) => (
                <li key={sale.id}>
                  <strong>Serviço:</strong>{" "}
                  {sale.items.map((item) => <p>{item.total}</p>) ||
                    "Desconhecido"}
                  <br />
                  <strong>Valor:</strong> R$ {sale.totalAmount.toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>Sem vendas registradas.</p>
          )}
        </Tabs.Item>
      </Tabs>
    </div>
  );
}
