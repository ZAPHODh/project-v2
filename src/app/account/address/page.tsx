import { AddressDisplay } from "@/components/account/address-display";
import { auth } from "@/lib/auth/auth";
import { getUser } from "@/lib/data/api-data";

import { redirect } from "next/navigation";

export default async function AddressPage({}) {
  const session = await auth();
  if (!session || !session?.user) return redirect("/login");

  const user = await getUser(session.user.id as string);

  return (
    <div className="flex items-start w-full">
      <div className="flex w-full">
        <AddressDisplay account={user} />
      </div>
    </div>
  );
}
