"use server";

import Profit from "@/components/charts/profit";

import NoSalon from "@/components/salon/no-salon";
import UpgradeBanner from "@/components/upgrade-banner";
import { auth } from "@/lib/auth/auth";
import { deleteSalon, getSalon } from "@/lib/data/api-data";
import { redirect } from "next/navigation";

import dynamic from "next/dynamic";
import { Steps } from "@/components/steps";

const Revenue = dynamic(() => import("@/components/charts/revenue"));

export default async function SalonPage() {
  const session = await auth();
  if (!session) return redirect("/login");
  const salon = await getSalon();
  if ("message" in salon) {
    return (
      <div className="w-full">
        <NoSalon />
        <UpgradeBanner />
      </div>
    );
  }
  return (
    <>
      <Steps />
      <Revenue />
      <Profit />
    </>
  );
}
