"use client";

import {
  Button,
  Dropdown,
  FloatingLabel,
  Pagination,
  Table,
} from "flowbite-react";
import { translateKey } from "@/lib/utils/translateKey";
import { format } from "date-fns";
import { Customer } from "@prisma/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  exportToExcel,
  exportToImage,
  exportToPDF,
} from "@/lib/utils/exportAppointments";
import { ModalProvider } from "@/lib/context/modal-context";
import { WarningExport } from "./warning-import";
import { NewCustomerModal } from "./new-customer";

type CustomerTableType = {
  customers: Customer[];
};

export function CustomerTable({ customers }: CustomerTableType) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [warningImport, setWarningImport] = useState(false);
  const [newCustomerModal, setNewCustomerModal] = useState(false);
  const [cachedCustomer, setCachedCustomer] = useState(customers);
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (!search) {
      setCachedCustomer(customers.slice(startIndex, endIndex));
      return;
    }

    const lowerSearch = search.toLowerCase();

    const filtered = customers.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(lowerSearch) ||
        customer.email?.toLowerCase().includes(lowerSearch) ||
        customer.address?.toString().includes(lowerSearch)
      );
    });

    setCachedCustomer(filtered.slice(startIndex, endIndex));
  }, [search, startIndex, endIndex, customers]);

  const tableHead: (keyof Customer)[] = [
    "name",
    "birthDay",
    "phone",
    "email",
    "genre",
    "city",
  ];

  const handleFileUpload = async (file: File) => {
    if (!file) {
      alert("Por favor, selecione um arquivo.");
      return;
    }
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Por favor, selecione um arquivo Excel válido (.xlsx ou .xls).");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("O arquivo é muito grande. O tamanho máximo permitido é 5MB.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("salon", customers[0].salonId);

    try {
      const response = await fetch("/api/customer/importExcel", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const newCustomers: Customer[] = await response.json();
        setCachedCustomer((prev) => [...prev, ...newCustomers]);
      } else {
        alert("Erro ao importar o arquivo.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar o arquivo.");
    }
  };
  const handleNewCustomer = (customer: Customer) => {
    setCachedCustomer((prev) => [...prev, customer]);
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
          <Dropdown label="Importar" dismissOnClick={false}>
            <Dropdown.Item onClick={() => setWarningImport(true)}>
              EXCEL
            </Dropdown.Item>
          </Dropdown>

          <Button color="gray" onClick={() => setNewCustomerModal(true)}>
            Novo Cliente
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            {tableHead.map((item) => (
              <Table.HeadCell key={item}>{translateKey(item)}</Table.HeadCell>
            ))}
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {cachedCustomer.map((customer) => (
              <Table.Row
                key={customer.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 "
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white capitalize">
                  {customer.name.toLowerCase()}
                </Table.Cell>
                <Table.Cell>
                  {customer.birthDay
                    ? format(new Date(customer.birthDay), "dd/MM/yyyy")
                    : "Sem dados"}
                </Table.Cell>
                <Table.Cell>{customer.phone || "Sem dados"}</Table.Cell>
                <Table.Cell>{customer.email || "Sem dados"}</Table.Cell>
                <Table.Cell className="capitalize">
                  {customer.genre || "Sem dados"}
                </Table.Cell>
                <Table.Cell className="capitalize">
                  {customer.city || "Sem dados"}
                </Table.Cell>
                <Table.Cell>
                  <Button color="gray">
                    <Link href={`/salon/customer/${customer.id}`}>Ver</Link>
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="flex justify-center lg:justify-end mt-4">
        <Pagination
          layout="pagination"
          currentPage={currentPage}
          totalPages={Math.ceil(customers.length / itemsPerPage)}
          onPageChange={(page) => setCurrentPage(page)}
          previousLabel="Anterior"
          nextLabel="Próximo"
        />
        <ModalProvider close={() => setNewCustomerModal(false)}>
          {newCustomerModal && (
            <NewCustomerModal handleNewCustomer={handleNewCustomer} />
          )}
        </ModalProvider>
        <ModalProvider close={() => setWarningImport(false)}>
          {warningImport && (
            <WarningExport handleFileUpload={handleFileUpload} />
          )}
        </ModalProvider>
      </div>
    </div>
  );
}
