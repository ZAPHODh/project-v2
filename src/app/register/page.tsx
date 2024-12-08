"use client";

import Input from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { login } from "@/lib/supabase/actions";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-96">
      <form className="flex flex-col gap-10 w-full p-10">
        <h2>Faça o seu cadastro</h2>
        <Input label="Nome" name="name" />
        <Input label="Email" name="email" />
        <Input type="password" label="Senha" name="password" />
        <div className="flex gap-3">
          <Button formAction={login}>Cadastrar</Button>
        </div>
        <p className="text-sm">
          Ao fazer o cadastro, voce confirma que leu e concorda com os{" "}
          <Link className="underline" href={"/terms"}>
            Termos de Uso
          </Link>
        </p>
      </form>
    </div>
  );
}
