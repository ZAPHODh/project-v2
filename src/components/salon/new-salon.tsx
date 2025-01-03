"use client";

import { useModal } from "@/lib/context/modal-context";
import { useState } from "react";
import Modal from "../modal";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { Salon } from "@prisma/client";
import { translateKey } from "@/lib/utils/translateKey";

type NewSalonType = {
  onSave: (newSalon: Partial<Salon>) => void;
};

export default function NewSalon({ onSave }: NewSalonType) {
  const { close } = useModal();
  const [salon, setSalon] = useState<Partial<Salon>>({});

  const salonKeys: (keyof Salon)[] = ["name", "address"];

  const handleSave = () => {
    if (!salon) return;
    onSave(salon);
    close();
  };

  const getInputValue = (key: keyof Salon) => {
    const value = salon[key];
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value || "";
  };

  return (
    <Modal isOpen={true} close={close} size="small">
      <Modal.Title close={close}>Crie seu Salão</Modal.Title>
      <Modal.Body>
        {salonKeys.map((key) => (
          <Input
            key={key}
            type="text"
            name={key}
            label={translateKey(key)}
            value={getInputValue(key)}
            onChange={(e) =>
              setSalon((prevSalon) => ({
                ...prevSalon,
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
