import { Professional, Service, User } from "@prisma/client";
import { getFormDataValue } from "../getFormDataValue";
import { fetchAPI } from "./fetchAPI";

import { ExpenseData, ProfessionalData, salonData } from "../../../types/db";

export const signUp = async (data: FormData) => {
  const formData = {
    email: getFormDataValue("email", data),
    name: getFormDataValue("name", data),
    password: getFormDataValue("password", data),
  };
  return await fetchAPI(`/api/users`, "POST", formData);
};

export const getUser = async (id: string): Promise<User | { name: string }> => {
  const response = await fetchAPI(`/api/users/${id}`, "GET", undefined, {
    tags: ["user"],
  });

  if (!response.success) {
    throw new Error(response.message || "Erro ao buscar o usuário");
  }

  return response.data;
};

export const editUser = async ({
  id,
  key,
  value,
}: {
  id: string;
  key: string;
  value: any;
}) => {
  return await fetchAPI(`/api/users/${id}`, "PUT", { [key]: value });
};

export const deleteUser = async (id: string) => {
  return await fetchAPI(`/api/users/${id}`, "DELETE");
};

export const getSalon = async (): Promise<salonData | { message: string }> => {
  return await fetchAPI(`/api/salons`, "GET", undefined, {
    tags: ["salon"],
  });
};

export const createSalon = async (data: Partial<salonData>) => {
  return await fetchAPI(`/api/salons`, "POST", data);
};

export const editSalon = async (id: string, data: Partial<salonData>) => {
  return await fetchAPI(`/api/salons/${id}`, "PUT", data);
};

export const deleteSalon = async (id: string) => {
  return await fetchAPI(`/api/salons/${id}`, "DELETE");
};

// Professionals
export const getProfessional = async (
  id: string
): Promise<ProfessionalData> => {
  return await fetchAPI(`/api/professionals/${id}`, "GET");
};
export const getProfessionals = async (): Promise<ProfessionalData[]> => {
  return await fetchAPI(`/api/professionals/`, "GET");
};

export const createProfessional = async (data: Partial<Professional>) => {
  return await fetchAPI(`/api/professionals`, "POST", data);
};

export const editProfessional = async (
  id: string,
  data: Partial<Professional>
) => {
  return await fetchAPI(`/api/professionals/${id}`, "PUT", data);
};

export const deleteProfessional = async (id: string) => {
  return await fetchAPI(`/api/professionals/${id}`, "DELETE");
};

// Services

export const getServices = async (): Promise<Partial<Service[]>> => {
  return await fetchAPI(`/api/services/`, "GET");
};

export const createService = async (data: Partial<Service>) => {
  return await fetchAPI(`/api/services`, "POST", data);
};

export const editService = async (id: string, data: Partial<Service>) => {
  return await fetchAPI(`/api/services/${id}`, "PUT", data);
};

export const deleteService = async (id: string) => {
  return await fetchAPI(`/api/services/${id}`, "DELETE");
};
export const deleteServices = async () => {
  return await fetchAPI(`/api/services/`, "DELETE");
};

// Expenses
export const getExpense = async (): Promise<ExpenseData> => {
  return await fetchAPI(`/api/expenses`, "GET", undefined, {
    tags: ["expense"],
  });
};

export const createExpense = async (data: Partial<ExpenseData>) => {
  return await fetchAPI(`/api/expenses`, "POST", data);
};

export const editExpense = async (id: string, data: Partial<ExpenseData>) => {
  return await fetchAPI(`/api/expenses/${id}`, "PATCH", data);
};

export const deleteExpense = async (id: string) => {
  return await fetchAPI(`/api/expenses/${id}`, "DELETE");
};

export const getTopServices = async (id: string): Promise<Service[]> => {
  return await fetchAPI(`/api/top-services/${id}`, "GET");
};
