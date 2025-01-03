import { ProfessionalNav } from "@/components/professionals/side-nav";
import { ProfessionalProvider } from "@/lib/context/professional-context";
import { getProfessionals } from "@/lib/data/api-data";

export default async function ProfessionalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const professionals = await getProfessionals();

  return (
    <ProfessionalProvider>
      <div className="w-full py-4 gap-2 flex flex-col sm:flex-row ">
        <ProfessionalNav professionals={professionals} />
        <div className="w-full">{children}</div>
      </div>
    </ProfessionalProvider>
  );
}
