export type EachRoute = {
  title: string;
  href: string;
  noLink?: true;
  items?: EachRoute[];
  dontShowNav?: true;
};
export const ROUTES: EachRoute[] = [
  {
    title: "Cálculo de Lucratividade",
    href: "/profit",
    noLink: true,
    items: [
      { title: "Introdução", href: "/introduction" },
      { title: "Calculadora", href: "/calculator" },
    ],
  },
  {
    title: "Salão",
    href: "/salon",
    noLink: true,
    items: [
      { title: "Serviços", href: "/services" },
      { title: "Produtos", href: "/products" },
      { title: "Despesas", href: "/expenses" },
    ],
  },
  {
    title: "Conta",
    href: "/account",
    dontShowNav: true,
    items: [
      {
        title: "Endereços",
        href: "/adress",
      },
    ],
  },
  { title: "Login", href: "/login", dontShowNav: true },
  { title: "Registro", href: "/register", dontShowNav: true },
  { title: "Termos", href: "/terms", dontShowNav: true },
];
