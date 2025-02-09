"use client";

import { useModal } from "@/lib/context/modal-context";

import Modal from "../modal";
import { Customer } from "@prisma/client";
import Input from "../ui/input";
import { translateKey } from "@/lib/utils/translateKey";
import { useState } from "react";
import { Button } from "flowbite-react";
import { createCustomer } from "@/lib/data/api-data";

type NewCustomerModalType = {
  handleNewCustomer: (customer: Customer) => void;
};

export function NewCustomerModal({ handleNewCustomer }: NewCustomerModalType) {
  const { close } = useModal();
  const [customer, setCustomer] = useState<Partial<Customer>>({});

  const inputs: (keyof Customer)[] = [
    "address",
    "city",
    "email",
    "phone",
    "name",
  ];

  const handleClick = async () => {
    const { name, city, email, phone } = customer;
    if (!name) return;
    try {
      const newCustomer = await createCustomer({ name, city, email, phone });
      handleNewCustomer(newCustomer);
      close();
    } catch {
      return;
    }
  };
  return (
    <Modal isOpen={true} close={close} size="large">
      <Modal.Title close={close}>Adicionar cliente</Modal.Title>
      <Modal.Body>
        {inputs.map((input) => (
          <Input
            key={input}
            label={translateKey(input)}
            name={input}
            value={
              customer[input] instanceof Date
                ? customer[input].toISOString().split("T")[0]
                : customer[input] || ""
            }
            onChange={(e) => {
              const value = e.target.value;
              setCustomer((prevCustomer) => ({
                ...prevCustomer,
                [input]: value,
              }));
            }}
          />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClick}>Criar</Button>
      </Modal.Footer>
    </Modal>
  );
}
