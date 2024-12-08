import AccountFooter from "@/components/account/account-footer";
import { AccountNav } from "@/components/account/account-nav";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-start flex-col py-7 ">
      <div className=" flex flex-col  lg:flex-row w-full">
        <AccountNav />
        <div className="flex-[4]">{children}</div>
      </div>
      <AccountFooter />
    </div>
  );
}
