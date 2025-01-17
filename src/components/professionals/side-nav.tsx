"use client";

import { useProfessional } from "@/lib/context/professional-context";
import { Professional } from "@prisma/client";
import UpgradeBanner from "../upgrade-banner";
import { useState } from "react";
import { ModalProvider } from "@/lib/context/modal-context";
import { NewProfessional } from "./new-professional";
import { createProfessional } from "@/lib/data/api-data";
import { ProfessionalData } from "../../../types/db";

type ProfessionalNavType = {
  professionals: ProfessionalData[];
};

export function ProfessionalNav({ professionals }: ProfessionalNavType) {
  const [cachedProfessionals, setCachedProfessionals] =
    useState<ProfessionalData[]>(professionals);
  const [showAddModal, setShowAddModal] = useState<boolean>();
  const { setProfessional } = useProfessional();

  const handleNewProfessional = async (professional: Partial<Professional>) => {
    try {
      const newProfessional = await createProfessional(professional);
      setCachedProfessionals((prevProfessional) => [
        ...prevProfessional,
        newProfessional,
      ]);
    } catch {}
  };
  return (
    <>
      <aside
        id="cta-button-sidebar"
        className="h-full w-full lg:w-80"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded">
          <div className="py-3 flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="ms-3">Profissionais</span>
          </div>
          <ul className="space-y-2 font-medium">
            {cachedProfessionals &&
              cachedProfessionals.map((professional) => (
                <li key={professional.id}>
                  <button
                    onClick={() => setProfessional(professional)}
                    className="flex text-left p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
                  >
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {professional.name}
                    </span>
                  </button>
                </li>
              ))}
          </ul>
          <button
            onClick={() => {
              setShowAddModal(true);
            }}
            type="button"
            className="my-2 w-full flex items-center justify-center focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              />
            </svg>
            Adicionar Profissional
          </button>
          <UpgradeBanner />
        </div>
      </aside>
      {showAddModal && (
        <ModalProvider close={() => setShowAddModal(false)}>
          <NewProfessional
            onSave={async (newProfessional: Partial<Professional>) =>
              handleNewProfessional(newProfessional)
            }
          />
        </ModalProvider>
      )}
    </>
  );
}
