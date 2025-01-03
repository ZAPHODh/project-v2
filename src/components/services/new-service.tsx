"use client";

import { useModal } from "@/lib/context/modal-context";
import { useState } from "react";
import Modal from "../modal";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { Service } from "@prisma/client";
import { translateKey } from "@/lib/utils/translateKey";

type NewServiceType = {
  onSave: (updatedService: Partial<Service>) => void;
};

export default function NewService({ onSave }: NewServiceType) {
  const { close } = useModal();
  const [service, setService] = useState<Partial<Service>>({});

  const serviceKeys: (keyof Service)[] = [
    "name",
    "price",
    "description",
    "duration",
  ];

  const handleSave = () => {
    if (!service) return;
    onSave(service);
    close();
  };

  const getInputValue = (key: keyof Service) => {
    const value = service[key];
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value || "";
  };

  return (
    <Modal isOpen={true} close={close} size="small">
      <Modal.Title close={close}>Crie um serviço</Modal.Title>
      <Modal.Body>
        {serviceKeys.map((key) => (
          <Input
            key={key}
            type={key === "duration" || key === "price" ? "number" : "text"}
            name={key}
            label={translateKey(key)}
            value={getInputValue(key)}
            onChange={(e) => {
              const value = e.target.value;
              setService((prevService) => ({
                ...prevService,
                [key]:
                  key === "price"
                    ? parseFloat(value)
                    : key === "duration"
                    ? parseInt(value, 10)
                    : value,
              }));
            }}
          />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}
