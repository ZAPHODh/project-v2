"use client";

import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signUp } from "@/lib/data/api-data";

export default function RegisterForm() {
  return (
    <div className="w-96">
      <form className="flex flex-col w-full p-10">
        <h2>Faça o seu cadastro</h2>
        <Input label="Nome" name="name" required />
        <Input label="Email" name="email" type="email" required />
        <Input type="password" label="Senha" name="password" required />
        <div className="flex my-2">
          <Button formAction={signUp}>Cadastrar</Button>
        </div>

        <p className="text-sm">
          Ao fazer o cadastro, você confirma que leu e concorda com os{" "}
          <Link className="underline" href="/terms">
            Termos de uso
          </Link>
        </p>
        <p className="text-sm">
          Já tem uma conta?
          <Link className="underline" href="/login">
            entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
