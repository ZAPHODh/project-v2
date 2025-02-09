"use client";

import { useModal } from "@/lib/context/modal-context";
import { useState } from "react";
import { CustomerData } from "../../../types/db";
import Modal from "../modal";
import Input from "../ui/input";
import { translateKey } from "@/lib/utils/translateKey";
import { Button } from "flowbite-react";
import { editCustomer } from "@/lib/data/api-data";

type EditGeneralType = {
  customer: CustomerData;
  onSave: (customer: CustomerData) => void;
};

export function EditGeneral({ customer, onSave }: EditGeneralType) {
  const { close } = useModal();
  const [currentCustomer, setCurrentCustomer] =
    useState<CustomerData>(customer);

  const handleSave = async () => {
    try {
      const { name, city, email, address } = currentCustomer;
      if (!name || !address || !city || !email) return;
      const updatedCustomer = await editCustomer(currentCustomer.id, {
        name,
        address,
        city,
        email,
      });
      onSave(updatedCustomer);
      close();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const customerKeys: { key: keyof CustomerData; type: string }[] = [
    { key: "name", type: "text" },
    { key: "address", type: "text" },
    { key: "city", type: "text" },
    { key: "email", type: "email" },
  ];

  return (
    <Modal isOpen={true} close={close} size="small">
      <Modal.Title close={close}>Edite o serviço</Modal.Title>
      <Modal.Body>
        {customerKeys.map(({ key, type }) => (
          <Input
            key={key}
            type={type}
            name={key}
            label={translateKey(key)}
            value={
              currentCustomer[key] instanceof Date
                ? (currentCustomer[key] as Date).toISOString()
                : typeof currentCustomer[key] === "string" ||
                  typeof currentCustomer[key] === "number"
                ? currentCustomer[key]
                : ""
            }
            onChange={(e) =>
              setCurrentCustomer((prev) => ({
                ...prev,
                [key]: e.target.value,
              }))
            }
          />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}
