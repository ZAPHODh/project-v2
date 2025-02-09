"use client";

import { useProfessional } from "@/lib/context/professional-context";
import { ProfessionalProfile } from "./professional-profile";
import { ProfessionalDetails } from "./professional-details";
import { TopServices } from "./top-services";
import { Apresentation } from "./apresentation";

export function ProfessionalMain() {
  const { professional } = useProfessional();

  return (
    <>
      <Apresentation />
      {professional && (
        <div className="flex flex-col lg:flex-row gap-2 w-full h-full">
          <ProfessionalProfile professional={professional} />
          <ProfessionalDetails professional={professional} />
          <TopServices sales={professional.sales} />
        </div>
      )}
    </>
  );
}
