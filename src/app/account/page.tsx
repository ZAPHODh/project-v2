import AccountDisplay from "@/components/account/account-display";
import { auth } from "@/lib/auth/auth";

import { getAccount } from "@/lib/data/api-data";

import { redirect } from "next/navigation";

export default async function AccountPage({}) {
  const session = await auth();
  if (!session) return redirect("/login");
  const account = await getAccount();
  return (
    <div className="flex items-start w-full">
      <div className="flex w-full">
        <AccountDisplay account={account} />
      </div>
    </div>
  );
}
