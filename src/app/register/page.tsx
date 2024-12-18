import RegisterForm from "@/components/auth/register-form";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await auth();
  if (session) redirect("/account");
  return <RegisterForm />;
}
