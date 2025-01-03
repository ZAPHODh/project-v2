"use client";

import { useModal } from "@/lib/context/modal-context";
import { useState } from "react";
import Modal from "../modal";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { Service } from "@prisma/client";
import { translateKey } from "@/lib/utils/translateKey";

type EditFieldModalProps = {
  currentService: Partial<Service>;
  onSave: (updatedService: Partial<Service>) => void;
};

const EditService: React.FC<EditFieldModalProps> = ({
  currentService,
  onSave,
}) => {
  const { close } = useModal();
  const [service, setService] = useState<Partial<Service>>(currentService);

  const handleSave = () => {
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
      <Modal.Title close={close}>Edite o serviço</Modal.Title>
      <Modal.Body>
        {Object.keys(service).map((key) => {
          if (key === "id") return;
          return (
            <Input
              key={key}
              type={key}
              name={key}
              label={translateKey(key as keyof Service)}
              value={getInputValue(key as keyof Service)}
              onChange={(e) =>
                setService((prevService) => ({
                  ...prevService,
                  [key]: e.target.value,
                }))
              }
            />
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditService;
