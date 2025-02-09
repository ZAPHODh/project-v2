import { ProfessionalMain } from "@/components/professionals/professional-main";
import { auth } from "@/lib/auth/auth";

import { redirect } from "next/navigation";

export default async function ProfessionalPage() {
  return (
    <>
      <ProfessionalMain />
    </>
  );
}
