"use server";

import { auth } from "../auth/auth";

export const fetchAPI = async (
  url: string,
  method: string,
  body?: any,
  options?: { tags?: string[]; skipAuth?: boolean }
) => {
  if (!options?.skipAuth) {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      console.log(session);
      console.warn("Usuário não autenticado.");
      return;
    }

    const userId = session.user.id;

    const fetchOptions: RequestInit = {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(userId && { "X-User-Id": userId }),
      },
      body: body ? JSON.stringify(body) : undefined,
      next: options?.tags ? { tags: options.tags } : undefined,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
      fetchOptions
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Erro na requisição autenticada:", error);
      throw new Error(error.message || "Erro desconhecido.");
    }

    return response.json();
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
    fetchOptions
  );

  if (!response.ok) {
    const error = await response.json();
    console.error("Erro na requisição não autenticada:", error);
    throw new Error(error.message || "Erro desconhecido.");
  }

  return response.json();
};
