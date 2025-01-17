"use client";

import { ROUTES } from "@/lib/routes-config";
import { Footer as FlowbiteFooter } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <FlowbiteFooter container>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <FlowbiteFooter.Brand
              href="/"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="PL PROJECT"
              name="PL PROJECT"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            {ROUTES.map(
              (route) =>
                !route.dontShowNav && (
                  <div key={route.title}>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                      {route.title}
                    </h2>
                    <ul className="text-gray-500 dark:text-gray-400 font-medium">
                      {(route.items || []).map(
                        (item) =>
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
        </div>
        <FlowbiteFooter.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FlowbiteFooter.Copyright
            href="#"
            by="PL Project"
            year={new Date().getFullYear()}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FlowbiteFooter.Icon href="#" icon={BsFacebook} />
            <FlowbiteFooter.Icon href="#" icon={BsInstagram} />
            <FlowbiteFooter.Icon href="#" icon={BsTwitter} />
            <FlowbiteFooter.Icon href="#" icon={BsGithub} />
            <FlowbiteFooter.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </FlowbiteFooter>
  );
}
