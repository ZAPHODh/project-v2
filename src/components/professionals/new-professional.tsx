import { useModal } from "@/lib/context/modal-context";
import { Professional } from "@prisma/client";
import { useState } from "react";
import Modal from "../modal";
import Input from "../ui/input";
import { translateKey } from "@/lib/utils/translateKey";
import { Button } from "../ui/button";

type NewProfessionalType = {
  onSave: (updatedService: Partial<Professional>) => void;
};

export function NewProfessional({ onSave }: NewProfessionalType) {
  const { close } = useModal();
  const [professional, setProfessional] = useState<Partial<Professional>>({});

  const profecionalsKey: (keyof Professional)[] = [
    "name",
    "address",
    "categroy",
    "cpf",
    "email",
    "phone",
  ];

  const handleSave = () => {
    if (!professional) return;
    onSave(professional);
    close();
  };

  const getInputValue = (key: keyof Professional) => {
    const value = professional[key];
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value || "";
  };

  return (
    <Modal isOpen={true} close={close} size="medium">
      <Modal.Title close={close}>Crie um Profissional</Modal.Title>
      <Modal.Body>
        {profecionalsKey.map((key) => (
          <Input
            key={key}
            type={"text"}
            name={key}
            label={translateKey(key)}
            value={getInputValue(key)}
            onChange={(e) => {
              const value = e.target.value;
              setProfessional((prevProfessional) => ({
                ...prevProfessional,
                [key]: value,
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
