"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { ModalProvider } from "@/lib/context/modal-context";
import NewSalon from "./new-salon";
import { Salon } from "@prisma/client";
import { createSalon } from "@/lib/data/api-data";
import { salonData } from "../../../types/db";

export default function NoSalon() {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(true);
  };
  const handleSave = async (salon: Partial<Salon>) => {
    await createSalon(salon);
    window.location.reload();
  };
  return (
    <div className="flex flex-col items-center w-full p-8">
      <svg
        className="w-10 h-10 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 8H4m8 3.5v5M9.5 14h5M4 6v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"
        />
      </svg>
      <h3 className="text-lg font-semibold">Sem salão cadastrado</h3>
      <p className="mb-4 text-base font-normal">
        Comece a configurar seu salão de beleza.
      </p>
      <Button className="gap-2" onClick={handleClick}>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14m-7 7V5"
          />
        </svg>
        Novo salão
      </Button>
      {showModal && (
        <ModalProvider close={() => setShowModal(false)}>
          <NewSalon
            onSave={async (updatedValue: Partial<Salon>) =>
              handleSave(updatedValue)
            }
          />
        </ModalProvider>
      )}
    </div>
  );
}
