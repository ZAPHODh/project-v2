import { Account, EditAccount } from "./types";

export const getAccount = async () => {
  const response = await fetch(`${process.env.API}/account` as string, {
    method: "GET",
    next: {
      tags: ["account"],
    },
  });
  const account: Account = await response.json();
  return account;
};

export const getSalon = async () => {
  const response = await fetch(`${process.env.API}/salon/` as string, {
    method: "GET",
    next: {
      tags: ["salon"],
    },
  });
  const account: Account = await response.json();
  return account;
};

export const editAccount = async ({ id, key, value }: EditAccount) => {
  try {
    await fetch(`/api/accounts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [key]: value }),
    });

    return "Valor atualizado com sucesso!";
  } catch (error) {
    return error;
  }
};
