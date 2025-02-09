"use client";

import { useModal } from "@/lib/context/modal-context";
import { FileInput, Label, Table } from "flowbite-react";
import { List } from "flowbite-react";

import Modal from "../modal";
type WarningExportType = {
  handleFileUpload: (file: File) => void;
};
export function WarningExport({ handleFileUpload }: WarningExportType) {
  const { close } = useModal();

  return (
    <Modal isOpen={true} close={close} size="large">
      <Modal.Title close={close}>Envie o arquivo</Modal.Title>
      <Modal.Body>
        Atenção! a tabela do seu arquivo deve seguir este padrão:
        <List>
          <List.Item>name: Nome do cliente</List.Item>
          <List.Item>city: Cidade do cliente (opcional)</List.Item>
          <List.Item>address: Endereço (opcional)</List.Item>
          <List.Item>phone: Telefone (opcional)</List.Item>
          <List.Item>email: E-mail (opcional)</List.Item>
          <List.Item>birthDay: Data de nascimento (opcional)</List.Item>
        </List>
        Exemplo:
        <div className="overflow-x-auto bg-gray-100 dark:bg-gray-600">
          <Table>
            <Table.Head>
              <Table.HeadCell>name</Table.HeadCell>
              <Table.HeadCell>city</Table.HeadCell>
              <Table.HeadCell>address</Table.HeadCell>
              <Table.HeadCell>phone</Table.HeadCell>
              <Table.HeadCell>email</Table.HeadCell>
              <Table.HeadCell>birthDay</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell>João Silva</Table.Cell>
                <Table.Cell>São Paulo</Table.Cell>
                <Table.Cell>Rua A, 123</Table.Cell>
                <Table.Cell>11999999999</Table.Cell>
                <Table.Cell>joao@email.com</Table.Cell>
                <Table.Cell>01/01/1990</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Maria Souza</Table.Cell>
                <Table.Cell>Rio de Janeiro</Table.Cell>
                <Table.Cell>Avenida B, 456</Table.Cell>
                <Table.Cell>21988888888</Table.Cell>
                <Table.Cell>maria@email.com</Table.Cell>
                <Table.Cell>15/05/1985</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Clique para carregar</span> ou
                arraste o arquivo
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                XLSX,XLS (MAX 10MB)
              </p>
            </div>
            <FileInput
              id="dropzone-file"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
              accept=".xlsx,.xls"
            />
          </Label>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
