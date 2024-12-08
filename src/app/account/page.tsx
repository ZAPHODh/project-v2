import AccountDisplay from "@/components/account/account-display";

// import { getAccount } from "@/lib/data/api-data";
import { Account } from "@/lib/data/types";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AccountPage({}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  // const account = await getAccount();
  const account: Account = {
    email: "Luis@gmail.com",
    _id: "sdgiudshg",
    name: "Luis",
  };

  return (
    <div className="flex items-start w-full ">
      <div className="flex w-full">
        <AccountDisplay account={account} />
      </div>
    </div>
  );
}
