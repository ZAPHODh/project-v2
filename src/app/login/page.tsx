"use client";

import Input from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { login } from "@/lib/supabase/actions";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-96">
      <form className="flex flex-col gap-10 w-full p-10">
        <h2>Efetue o login</h2>
        <Input label="Email" name="email"></Input>
        <Input type="password" label="Senha" name="password"></Input>
        <div className="flex gap-3">
          <Button formAction={login}>Entrar</Button>
        </div>
        <p>
          não tem conta?<Link href={"/register"}>crie uma agora</Link>
        </p>
      </form>
    </div>
  );
}
