"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup } from "flowbite-react";
const prefix = "/account";

export const PAGELINKS = [
  { title: "Dados Cadastrados", href: `${prefix}` },
  { title: "Endereços", href: `${prefix}/address` },
  { title: "Planos", href: `${prefix}/plans` },
];

export const AccountNav = () => {
  const route = usePathname();

  return (
    <div className="flex h-full lg:justify-center lg:items-center py-5">
      <ListGroup className="w-full lg:w-48 ">
        {PAGELINKS.map((link) => {
          const isActive = route === link.href;
          return (
            <ListGroup.Item key={link.href} active={isActive}>
              <Link
                href={link.href}
                onClick={(e) => e.stopPropagation()}
                className="w-full text-left"
              >
                {link.title}
              </Link>
            </ListGroup.Item>
          );
        })}
        <ListGroup.Item
          className="flex-1 text-center"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sair
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};
