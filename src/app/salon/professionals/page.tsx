import { ProfessionalMain } from "@/components/professionals/professional-main";
import { auth } from "@/lib/auth/auth";

import { redirect } from "next/navigation";

export default async function ProfessionalPage() {
  const session = await auth();

  if (!session) return redirect("/login");

  return (
    <>
      <ProfessionalMain />
    </>
  );
}
