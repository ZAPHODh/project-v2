import LoginForm from "@/components/auth/login-form";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if (session) return redirect("/account");
  return <LoginForm />;
}
