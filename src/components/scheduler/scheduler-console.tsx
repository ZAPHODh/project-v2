"use client";

import { Datepicker } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import { ProfessionalData } from "../../../types/db";
import { useState } from "react";
type SchedulerConsoleType = {
  handleDateChange: (date: Date | null) => void;
  professionals: ProfessionalData[];
  selectedProfessional: (professional: ProfessionalData | "all") => void;
  selectedExport: (to: "google" | "ios") => void;
};
export function SchedulerConsole({
  handleDateChange,
  professionals,
  selectedProfessional,
  selectedExport,
}: SchedulerConsoleType) {
  const [professional, setProfessional] = useState("Profissionais");

  const handleExport = (to: "google" | "ios") => {
    selectedExport(to);
  };

  const handleSelectedProfessional = (
    professional: ProfessionalData | null
  ) => {
    if (!professional) {
      setProfessional("Profissionais");
      return selectedProfessional("all");
    }
    setProfessional(professional.name);
    return selectedProfessional(professional);
  };
  return (
    <div className="container w-full flex p-4 items-center gap-3 flex-col lg:flex-row b">
      <Datepicker
        language="pt-BR"
        labelTodayButton="Hoje"
        labelClearButton="Limpar"
        title="ESCOLHA A DATA"
        onChange={handleDateChange}
      />
      <Dropdown label={professional}>
        <Dropdown.Item onClick={() => handleSelectedProfessional(null)}>
          Todos
        </Dropdown.Item>
        <Dropdown.Divider />
        {professionals.map((professional) => (
          <Dropdown.Item
            key={professional.name}
            onClick={() => handleSelectedProfessional(professional)}
          >
            {professional.name}
          </Dropdown.Item>
        ))}
      </Dropdown>
      <Dropdown
        label=""
        dismissOnClick={false}
        renderTrigger={() => (
          <span className="flex gap-2 hover:cursor-pointer">
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
                d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                clipRule="evenodd"
              />
            </svg>
            Exportar
          </span>
        )}
      >
        <Dropdown.Item onClick={() => handleExport("google")}>
          Calendário do Google
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleExport("ios")}>
          Arquivo ICS
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}
