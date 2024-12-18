"use client";

import Input from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import Link from "next/link";

import {
  signInWithApple,
  signInWithCredentials,
  signInWithGoogle,
} from "@/lib/auth/action";

export default function LoginForm() {
  return (
    <div className="w-96">
      <form className="flex flex-col gap-10 w-full p-10">
        <h2>Efetue o login</h2>
        <Input label="Email" name="email"></Input>
        <Input type="password" label="Senha" name="password"></Input>
        <div className="flex gap-3">
          <Button formAction={signInWithCredentials}>Entrar</Button>
        </div>
        <div>
          <p>
            <Link href={"/register"} className="underline">
              Esqueceu sua senha?
            </Link>
          </p>
          <p>
            Não tem conta?{" "}
            <Link href={"/register"} className="underline">
              Crie uma agora.
            </Link>
          </p>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <div className="flex-grow border-t "></div>
            <span className="mx-4 ">ou</span>
            <div className="flex-grow border-t 0"></div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <Button
            type="button"
            className="flex items-center justify-center gap-3"
            onClick={signInWithGoogle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
              className="flex-shrink-0 w-5 h-5"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Entrar com o Google
          </Button>
          <Button
            type="button"
            className="flex items-center justify-center gap-3"
            onClick={signInWithApple}
          >
            <svg
              className="flex-shrink-0 w-5 h-5 c-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.537 12.625a4.421 4.421 0 0 0 2.684 4.047 10.96 10.96 0 0 1-1.384 2.845c-.834 1.218-1.7 2.432-3.062 2.457-1.34.025-1.77-.794-3.3-.794-1.531 0-2.01.769-3.275.82-1.316.049-2.317-1.318-3.158-2.532-1.72-2.484-3.032-7.017-1.27-10.077A4.9 4.9 0 0 1 8.91 6.884c1.292-.025 2.51.869 3.3.869.789 0 2.27-1.075 3.828-.917a4.67 4.67 0 0 1 3.66 1.984 4.524 4.524 0 0 0-2.16 3.805m-2.52-7.432A4.4 4.4 0 0 0 16.06 2a4.482 4.482 0 0 0-2.945 1.516 4.185 4.185 0 0 0-1.061 3.093 3.708 3.708 0 0 0 2.967-1.416Z" />
            </svg>
            Entrar com a Apple
          </Button>
        </div>
      </form>
    </div>
  );
}
