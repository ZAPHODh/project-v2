"use client";

import React, { createContext, Dispatch, useContext, useState } from "react";
import { ProfessionalData } from "../../../types/db";

interface ProfessionalContext {
  professional: ProfessionalData | undefined;
  setProfessional: Dispatch<ProfessionalData | undefined>;
}

const ModalContext = createContext<ProfessionalContext | null>(null);

interface ProfessionalProviderProps {
  children?: React.ReactNode;
}

export const ProfessionalProvider = ({
  children,
}: ProfessionalProviderProps) => {
  const [professional, setProfessional] = useState<
    ProfessionalData | undefined
  >(undefined);
  return (
    <ModalContext.Provider value={{ professional, setProfessional }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useProfessional = () => {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error(
      "useProfessioanl must be used within a ProfessionalProvider"
    );
  }
  return context;
};
