import AccountDisplay from "@/components/account/account-display";
import { auth } from "@/lib/auth/auth";
import { Account } from "@/lib/data/types";

// import { getAccount } from "@/lib/data/api-data";

import { redirect } from "next/navigation";

export default async function AccountPage({}) {
  const session = await auth();
  if (!session) return redirect("/login");
  // const account = await getAccount();
  const account: Account = {
    _id: "sdgojsdogijsdg",
    email: "aoigjoisdjg",
    name: "jsdogijsdiogj",
  };
  return (
    <div className="flex items-start w-full">
      <div className="flex w-full">
        <AccountDisplay account={account} />
      </div>
    </div>
  );
}
