"use client";

import { Banner } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { PiHairDryerFill } from "react-icons/pi";

export function Apresentation() {
  return (
    <Banner>
      <div className="flex w-full items-center justify-between bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
          <PiHairDryerFill className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">
          Adicione seus profissionais
        </div>
        <Banner.CollapseButton
          color="gray"
          className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
        >
          <HiX className="h-4 w-4" />
        </Banner.CollapseButton>
      </div>
    </Banner>
  );
}
