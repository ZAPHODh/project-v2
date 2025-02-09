import { SalonBar } from "@/components/salon/nav-bar";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

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
  const session = await auth();
  if (!session) return redirect("/login");
  return (
    <>
      <SalonBar navLinks={NAVLINKS} />
      {children}
    </>
  );
}
