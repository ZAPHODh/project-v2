"use client";

import { useModal } from "@/lib/context/modal-context";
import { useState } from "react";
import Modal from "../modal";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { Professional } from "@prisma/client";
import { translateKey } from "@/lib/utils/translateKey";

type NewServiceType = {
  onSave: (newDescription: string) => void;
};

export default function AddDescription({ onSave }: NewServiceType) {
  const { close } = useModal();
  const [description, setDescription] = useState<string>("");

  const serviceKeys: (keyof Professional)[] = ["description"];

  const handleSave = () => {
    if (!description) return;
    onSave(description);
    close();
  };

  return (
    <Modal isOpen={true} close={close} size="small">
      <Modal.Title close={close}>Adicione a descrição</Modal.Title>
      <Modal.Body>
        {serviceKeys.map((key) => (
          <Input
            key={key}
            type={"text"}
            name={key}
            label={translateKey(key)}
            value={description}
            onChange={(e) => {
              const value = e.target.value;
              setDescription(value);
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
