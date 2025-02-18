"use client";

import { ModalProvider } from "@/lib/context/modal-context";

import { useState } from "react";
import EditFieldModal from "./edit-field-modal";
import { Button } from "../ui/button";

import { User } from "@prisma/client";
import { editUser } from "@/lib/data/api-data";
import UpgradeBanner from "../upgrade-banner";

type AccountDisplayProps = {
  account: Partial<User>;
};

export const AddressDisplay: React.FC<AccountDisplayProps> = ({ account }) => {
  const [cachedAccount, setCachedAccount] = useState<Partial<User>>(account);

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState<{
    key: keyof User;
    value: string;
  } | null>(null);

  const handleEditClick = (key: keyof User, value: string) => {
    setCurrentField({ key, value });
    setModalOpen(true);
  };

  const handleSave = async (key: keyof User, value: string) => {
    try {
      await editUser({
        id: account.id!,
        key,
        value,
      });
      setModalOpen(false);
      setCachedAccount((prevAccout) => ({ ...prevAccout, [key]: value }));
    } catch {
      alert("Erro ao salvar a alteração.");
    }
  };

  return (
    <div className="w-full lg:p-5 ">
      {Object.entries(cachedAccount)
        .filter(([key]) => key !== "id")
        .map(([key, value]) => (
          <div
            key={key}
            className="p-4 mb-4 text-sm flex justify-between items-center border-b"
          >
            <div>
              <h3 className="font-semibold capitalize">{key}:</h3>
              <p>
                {value instanceof Date
                  ? value.toLocaleDateString()
                  : value || "N/A"}
              </p>
            </div>
            <Button
              onClick={() =>
                handleEditClick(
                  key as keyof User,
                  value instanceof Date ? value.toISOString() : value || ""
                )
              }
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
      {account.subscriptionRole ? <></> : <UpgradeBanner />}
    </div>
  );
};
