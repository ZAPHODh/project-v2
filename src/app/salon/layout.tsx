import { SalonBar } from "@/components/salon/nav-bar";

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
    title: "Lançamentos",
    href: "/salon/finance",
  },
  {
    title: "Profissionais",
    href: "/salon/professionals",
  },
  {
    title: "Agenda",
    href: "/salon/scheduler",
  },
  {
    title: "Clientes",
    href: "/salon/customer",
  },
];

export default async function SalonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SalonBar navLinks={NAVLINKS} />
      {children}
    </>
  );
}
