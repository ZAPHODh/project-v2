import { SalonBar } from "@/components/salon/nav-bar";
import Stepper from "@/components/stepper";

import { getSalon } from "@/lib/data/api-data";

const NAVLINKS = [
  {
    title: "Salão",
    href: "/salon",
  },
  {
    title: "Serviços",
    href: "/salon/services",
  },
  {
    title: "Despesas",
    href: "/salon/expenses",
  },
  {
    title: "Profissionais",
    href: "/salon/professionals",
  },
];

export default async function SalonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const salon = await getSalon();
  return (
    <>
      <SalonBar navLinks={NAVLINKS} />
      <Stepper steps={salon} />
      {children}
    </>
  );
}
