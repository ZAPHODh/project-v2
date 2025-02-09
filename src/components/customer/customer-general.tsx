"use client";

import { useState } from "react";
import { CustomerData } from "../../../types/db";
import { Button, Datepicker, Label, Select } from "flowbite-react";
import { editCustomer } from "@/lib/data/api-data";
import { ModalProvider } from "@/lib/context/modal-context";
import { EditGeneral } from "./edit-general";

type CustomerGeneralProps = {
  customer: CustomerData;
};

export function CustomerGeneral({ customer }: CustomerGeneralProps) {
  const [updateCustomer, setUpdateCustomer] = useState<CustomerData>(customer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDateChange = (date: Date | null) => {
    setUpdateCustomer((prev) => ({
      ...prev,
      birthDay: date ? date : null,
    }));
  };
  const handleGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = e.target.value;
    setUpdateCustomer((prev) => ({ ...prev, genre }));
  };
  const handleSave = async () => {
    const { birthDay, genre } = updateCustomer;
    const updatedCustomer = await editCustomer(customer.id, {
      birthDay,
      genre,
    });
    setUpdateCustomer(updatedCustomer);
  };
  const onEdit = (editedCustomer: CustomerData) => {
    setUpdateCustomer(editedCustomer);
  };
  return (
    <>
      <div className="rounded-xl bg-white dark:bg-gray-800 p-4 my-4">
        <h1>Informações do cliente</h1>
        <div className=" w-full py-3 flex flex-col md:flex-row items-center gap-6 text-gray-900 dark:text-white border-b dark:border-gray-900">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold capitalize">
              {updateCustomer.name.toLowerCase()}
            </h3>
            <div>
              <p className="text-lg font-bold  mb-2">Cidade</p>
              <p className="mb-2 capitalize">
                {updateCustomer.city?.toLowerCase() || "Não informado"}
              </p>
            </div>
            <div>
              <p className="text-lg font-bold  mb-2">Endereço</p>
              <p className="mb-2 capitalize">
                {updateCustomer.address?.toLowerCase() || "Não informado"}
              </p>
            </div>
            <div>
              <p className="text-lg font-bold  mb-2">Telefone</p>
              <p className="mb-2"> {updateCustomer.phone || "Não informado"}</p>
            </div>
            <div>
              <p className="text-lg font-bold  mb-2">Email</p>
              <p className="mb-2 ">{updateCustomer.email || "Não informado"}</p>
            </div>
          </div>
        </div>
        <div className="pt-4 h-full">
          <Button onClick={() => setIsModalOpen(true)}>Editar</Button>
        </div>
      </div>
      <div className="rounded-xl bg-white dark:bg-gray-800 p-4 my-4">
        <div className=" w-full py-3 flex flex-col md:flex-row items-center gap-6 text-gray-900 dark:text-white border-b dark:border-gray-900">
          <div className="flex-1 space-y-4">
            <div className="max-w-md">
              <div className="mb-2 block">
                <p>Data de aniversário</p>
              </div>
              <Datepicker
                language="pt-BR"
                labelTodayButton="Hoje"
                labelClearButton="Limpar"
                onChange={handleDateChange}
                value={
                  updateCustomer.birthDay
                    ? new Date(updateCustomer.birthDay)
                    : null
                }
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="genres" value="Selecione o seu gênero" />
              </div>
              <Select id="genres" required onChange={handleGenre}>
                <option value={"male"}>Masculino</option>
                <option value={"female"}>Feminino</option>
                <option value={"other"}>Outro</option>
              </Select>
            </div>
          </div>
        </div>
        <div className="pt-4 h-full">
          <Button onClick={handleSave}>Salvar</Button>
        </div>
        <ModalProvider close={() => setIsModalOpen(false)}>
          {isModalOpen && (
            <EditGeneral customer={updateCustomer} onSave={onEdit} />
          )}
        </ModalProvider>
      </div>
    </>
  );
}
