"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const prefix = "/account";

export const PAGELINKS = [
  { title: "Dados Cadastrados", href: `${prefix}` },
  { title: "Endereços", href: `${prefix}/adress` },
];

export const AccountNav = () => {
  const route = usePathname();

  return (
    <div className="flex h-full lg:justify-center lg:items-center p-4 lg:px-4 ">
      <ul className="flex flex-row w-full lg:flex-col lg:gap-4 justify-evenly items-center lg:items-start">
        {PAGELINKS.map((link) => {
          const isActive = route === link.href;
          return (
            <li key={link.href} className="flex-1 text-center">
              <Link
                href={link.href}
                className={`block py-2 px-4 ${isActive ? "font-semibold" : ""}`}
              >
                {link.title}
              </Link>
            </li>
          );
        })}
        <li className="flex-1 text-center">
          <Link href={"/logout"} className="block py-2 px-4">
            Sair
          </Link>
        </li>
      </ul>
    </div>
  );
};
