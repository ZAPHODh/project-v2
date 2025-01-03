"use client";

import { Professional } from "@prisma/client";
import { Button } from "../ui/button";
import { useState } from "react";
import { ModalProvider } from "@/lib/context/modal-context";
import AddDescription from "./add-description";
import { editProfessional } from "@/lib/data/api-data";

type ProfessionalDetailsType = {
  professional: Professional;
};

export function ProfessionalDetails({ professional }: ProfessionalDetailsType) {
  const [addDescriptionModal, setAddDescripitonModal] =
    useState<boolean>(false);
  const [description, setDescripiton] = useState<string>();
  const handleNewDescription = async (newDescription: string) => {
    try {
      await editProfessional(professional.id, { description: newDescription });
      setDescripiton(newDescription);
    } catch {}
  };
  return (
    <div className="w-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded">
      <h2 className="mb-4 text-lg font-bold">Informações gerais</h2>

      <section className="mb-6">
        <h3 className="mb-2 text-md font-semibold">Sobre o Profissional</h3>
        <p className="text-gray-400 mb-2 min-h-24">
          {professional.description || description ? (
            professional.description || description
          ) : (
            <>
              "Sem descrições disponíveis. Cadastre agora"
              <button
                onClick={() => setAddDescripitonModal(true)}
                type="button"
                className="m-3 text-white my-2 flex items-center justify-center focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Adicionar descrição
              </button>
            </>
          )}
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
        <div>
          <p className="text-sm font-medium text-gray-500">CPF</p>
          <p className="font-semibold">{professional.cpf || "N/A"}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Data de entrada</p>
          <p className="font-semibold">
            {professional.createdAt
              ? new Date(professional.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Birthday</p>
          <p className="font-semibold">
            {professional.createdAt
              ? new Date(professional.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
      {addDescriptionModal && (
        <ModalProvider close={() => setAddDescripitonModal(false)}>
          <AddDescription
            onSave={async (newProfessional: string) =>
              handleNewDescription(newProfessional)
            }
          />
        </ModalProvider>
      )}
    </div>
  );
}
