"use client";

import { ModalProvider } from "@/lib/context/modal-context";
import { Account } from "@/lib/data/types";
import { useState } from "react";
import EditFieldModal from "./edit-field-modal";
import { Button } from "../ui/button";
import { editAccount } from "@/lib/data/api-data";

type AccountDisplayProps = {
  account: Account;
};

const AccountDisplay: React.FC<AccountDisplayProps> = ({ account }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState<{
    key: keyof Account;
    value: string;
  } | null>(null);

  const handleEditClick = (key: keyof Account, value: string) => {
    setCurrentField({ key, value });
    setModalOpen(true);
  };

  const handleSave = async (key: keyof Account, value: string) => {
    await editAccount({
      id: account._id,
      key,
      value,
    });
    setModalOpen(false);
  };

  return (
    <div className="w-full lg:p-5 ">
      {Object.entries(account)
        .filter(([key]) => key !== "_id")
        .map(([key, value]) => (
          <div
            key={key}
            className="p-4 mb-4 text-sm flex justify-between items-center border-b"
          >
            <div>
              <h3 className="font-semibold capitalize">{key}:</h3>
              <p>{value}</p>
            </div>
            <Button
              onClick={() => handleEditClick(key as keyof Account, value)}
            >
              Editar
            </Button>
          </div>
        ))}

      {isModalOpen && currentField && (
        <ModalProvider close={() => setModalOpen(false)}>
          <EditFieldModal
            fieldKey={currentField.key}
            fieldValue={currentField.value}
            onSave={async (updatedValue: string) =>
              handleSave(currentField.key, updatedValue)
            }
          />
        </ModalProvider>
      )}
    </div>
  );
};

export default AccountDisplay;
