"use client";

import {
  Button,
  Dropdown,
  FloatingLabel,
  Pagination,
  Table,
} from "flowbite-react";
import { ExpenseData, SalesData } from "../../../types/db";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { exportToImage } from "@/lib/utils/exportAppointments";
import { ModalProvider } from "@/lib/context/modal-context";
import { NewExpenseModal } from "./new-expense";
import { ExpenseCategory, Professional, Service } from "@prisma/client";
import { NewSaleModal } from "./new-sale";
type FinanceTableType = {
  finances: (ExpenseData | SalesData)[];
  expenseCategories: ExpenseCategory[];
  professionals: Professional[];
  services: Service[];
};

export function FinanceTable({
  finances = [],
  expenseCategories = [],
  professionals = [],
  services = [],
}: FinanceTableType) {
  const [cachedFinances, setCachedFinances] = useState(finances);
  const [cachedCategory, setCachedCategory] = useState(expenseCategories);
  const [newExpenseModal, setNewExpenseModal] = useState(false);
  const [newSaleModal, setNewSaleModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    if (!search) {
      setCachedFinances(finances.slice(startIndex, endIndex));
      return;
    }

    const lowerSearch = search.toLowerCase();

    const filtered = finances.filter((finance) => {
      if ("amount" in finance) {
        return (
          finance.amount.toString().includes(lowerSearch) ||
          format(new Date(finance.createdAt), "dd/MM/yyyy").includes(
            lowerSearch
          )
        );
      } else if ("totalAmount" in finance) {
        return (
          finance.totalAmount.toString().includes(lowerSearch) ||
          format(new Date(finance.createdAt), "dd/MM/yyyy").includes(
            lowerSearch
          )
        );
      }
      return false;
    });

    setCachedFinances(filtered.slice(startIndex, endIndex));
  }, [search, startIndex, endIndex, finances]);
  const handleNewCategory = (category: ExpenseCategory) => {
    setCachedCategory((prev) => [...prev, category]);
  };
  const handleNewExpense = (expense: ExpenseData) => {
    setCachedFinances((prev) => [...prev, expense]);
  };
  const handleNewSale = (sale: SalesData) => {
    setCachedFinances((prev) => [...prev, sale]);
  };
  return (
    <div className="w-full p-4">
      <div className="flex flex-col lg:flex-row gap-3 items-center">
        <FloatingLabel
          variant="filled"
          label="Pesquisar"
          className="min-w-md w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 pb-5 lg:pb-1">
          <Dropdown label="Exportar" dismissOnClick={false}>
            <Dropdown.Item>Formato PDF</Dropdown.Item>
            <Dropdown.Item onClick={exportToImage}>
              Formato Imagem
            </Dropdown.Item>
            <Dropdown.Item>Formato Excel</Dropdown.Item>
          </Dropdown>

          <Button color="green" onClick={() => setNewSaleModal(true)}>
            Nova Entrada
          </Button>
          <Button color="red" onClick={() => setNewExpenseModal(true)}>
            Nova Saída
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Tipo</Table.HeadCell>
            <Table.HeadCell>Categoria / Detalhes</Table.HeadCell>
            <Table.HeadCell>Valor</Table.HeadCell>
            <Table.HeadCell>Data</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {cachedFinances.map((finance, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      "totalAmount" in finance ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  {"totalAmount" in finance ? "Venda" : "Despesa"}
                </Table.Cell>

                <Table.Cell className="capitalize">
                  {"totalAmount" in finance
                    ? finance.items
                        ?.map(
                          (item) => item.service?.name || item.product?.name
                        )
                        .join(", ") || "Serviço/Produto não informado"
                    : finance.category?.name.toLowerCase() || "Sem categoria"}
                </Table.Cell>

                <Table.Cell>
                  {"amount" in finance
                    ? `R$ ${finance.amount.toFixed(2)}`
                    : `R$ ${finance.totalAmount.toFixed(2)}`}
                </Table.Cell>

                <Table.Cell>
                  {format(new Date(finance.createdAt), "dd/MM/yyyy")}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className="flex justify-center lg:justify-end mt-4">
          <Pagination
            layout="pagination"
            currentPage={currentPage}
            totalPages={Math.ceil(finances.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
            previousLabel="Anterior"
            nextLabel="Próximo"
          />
        </div>
      </div>
      <ModalProvider close={() => setNewExpenseModal(false)}>
        {newExpenseModal && (
          <NewExpenseModal
            categories={cachedCategory}
            handleNewCategory={handleNewCategory}
            handleNewExpense={handleNewExpense}
          />
        )}
      </ModalProvider>
      <ModalProvider close={() => setNewSaleModal(false)}>
        {newSaleModal && (
          <NewSaleModal
            handleNewSale={handleNewSale}
            professionals={professionals}
            services={services}
          />
        )}
      </ModalProvider>
    </div>
  );
}
