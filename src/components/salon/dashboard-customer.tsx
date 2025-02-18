"use client";

import { useMemo } from "react";
import { Table, Tabs } from "flowbite-react";
import { HiLocationMarker, HiShoppingCart, HiRefresh } from "react-icons/hi";
import { CustomerData } from "../../../types/db";

interface CustomerTabsProps {
  customers: CustomerData[];
}

export default function CustomerTabs({ customers }: CustomerTabsProps) {
  const customersByRegion = useMemo(() => {
    const regionMap: Record<string, number> = {};
    customers.forEach(({ city }) => {
      if (!city) return;
      regionMap[city] = (regionMap[city] || 0) + 1;
    });

    return Object.entries(regionMap).map(([city, count]) => ({ city, count }));
  }, [customers]);

  const topSpendingCustomers = useMemo(() => {
    return [...customers]
      .sort((a, b) => b.sales.length - a.sales.length)
      .slice(0, 10);
  }, [customers]);

  const mostFrequentCustomers = useMemo(() => {
    return [...customers]
      .sort((a, b) => b.appointments.length - a.appointments.length)
      .slice(0, 10);
  }, [customers]);

  return (
    <div className="w-full flex max-w-4xl mx-auto py-4 rounded lg:max-h-[660px] overflow-y-auto">
      <Tabs aria-label="Customer Insights" variant="underline">
        <Tabs.Item title="Clientes por Região" icon={HiLocationMarker}>
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Cidade</Table.HeadCell>
                <Table.HeadCell>Quantidade</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {customersByRegion.map(({ city, count }) => (
                  <Table.Row key={city} className="bg-white dark:bg-gray-800">
                    <Table.Cell className="font-medium text-gray-900 dark:text-white capitalize">
                      {city}
                    </Table.Cell>
                    <Table.Cell>{count}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Tabs.Item>

        <Tabs.Item title="Clientes que Mais Compram" icon={HiShoppingCart}>
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Nome</Table.HeadCell>
                <Table.HeadCell>Compras</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {topSpendingCustomers.map(({ id, name, sales }) => (
                  <Table.Row key={id} className="bg-white dark:bg-gray-800">
                    <Table.Cell className="font-medium text-gray-900 dark:text-white">
                      {name}
                    </Table.Cell>
                    <Table.Cell>{sales.length}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Tabs.Item>

        <Tabs.Item title="Clientes Mais Frequentes" icon={HiRefresh}>
          <div className="overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell>Nome</Table.HeadCell>
                <Table.HeadCell>Agendamentos</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {mostFrequentCustomers.map(({ id, name, appointments }) => (
                  <Table.Row key={id} className="bg-white dark:bg-gray-800">
                    <Table.Cell className="font-medium text-gray-900 dark:text-white">
                      {name}
                    </Table.Cell>
                    <Table.Cell>{appointments.length}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Tabs.Item>
      </Tabs>
    </div>
  );
}
