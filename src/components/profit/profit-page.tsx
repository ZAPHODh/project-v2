"use client";
import { Table } from "flowbite-react";

interface Props {
  data: {
    serviceId: string;
    serviceName: string;
    idealRevenue: number;
    realRevenue: number;
    totalCosts: number;
    idealProfit: number;
    realProfit: number;
    profitPercentage: string;
  }[];
}

export const ProfitabilityTable = ({ data }: Props) => {
  return (
    <div className="overflow-x-auto">
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Serviço</Table.HeadCell>
          <Table.HeadCell>Receita Ideal</Table.HeadCell>
          <Table.HeadCell>Receita Real</Table.HeadCell>
          <Table.HeadCell>Custos Totais</Table.HeadCell>
          <Table.HeadCell>Lucro Ideal</Table.HeadCell>
          <Table.HeadCell>Lucro Real</Table.HeadCell>
          <Table.HeadCell>Lucro (%)</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {data.map((item) => (
            <Table.Row
              key={item.serviceId}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="font-medium text-gray-900 dark:text-white">
                {item.serviceName}
              </Table.Cell>
              <Table.Cell>R$ {item.idealRevenue.toFixed(2)}</Table.Cell>
              <Table.Cell>R$ {item.realRevenue.toFixed(2)}</Table.Cell>
              <Table.Cell>R$ {item.totalCosts.toFixed(2)}</Table.Cell>
              <Table.Cell>R$ {item.idealProfit.toFixed(2)}</Table.Cell>
              <Table.Cell>R$ {item.realProfit.toFixed(2)}</Table.Cell>
              <Table.Cell className="font-bold">
                {item.profitPercentage}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
