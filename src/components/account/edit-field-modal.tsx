"use client";

import { useModal } from "@/lib/context/modal-context";
import { useState } from "react";
import Modal from "../modal";
import Input from "../ui/input";
import { Button } from "../ui/button";

type EditFieldModalProps = {
  fieldKey: string;
  fieldValue: string;
  onSave: (updatedValue: string) => void;
};

const EditFieldModal: React.FC<EditFieldModalProps> = ({
  fieldKey,
  fieldValue,
  onSave,
}) => {
  const { close } = useModal();
  const [value, setValue] = useState(fieldValue);

  const handleSave = () => {
    onSave(value);
    close();
  };

  return (
    <Modal isOpen={true} close={close} size="small">
      <Modal.Title close={close}>Editar </Modal.Title>
      <Modal.Body>
        <Input
          type={fieldKey === "email" ? "email" : "text"}
          name={fieldKey}
          label={fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditFieldModal;
