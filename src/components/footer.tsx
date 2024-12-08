"use client";

import { ROUTES } from "@/lib/routes-config";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-screen-xl h-full ">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          {ROUTES.map(
            (route) =>
              // Verifica se o item tem a chave dontShowNav para não renderizar
              !route.dontShowNav && (
                <div key={route.title}>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    {route.title}
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    {(route.items || []).map(
                      (item) =>
                        // Verifica a chave dontShowNav para os itens também
                        !item.dontShowNav && (
                          <li key={item.href} className="mb-4">
                            <Link
                              href={`${route.href}${item.href}`}
                              className="hover:underline"
                            >
                              {item.title}
                            </Link>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )
          )}
        </div>
        <div className="px-4 py-6 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            © {new Date().getFullYear()}{" "}
            <Link href="https://yourwebsite.com/">PL project</Link>. Todos os
            direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
