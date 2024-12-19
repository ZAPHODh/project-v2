import {
  Expense,
  Professional,
  Salon,
  Service,
  Tax,
  User,
} from "@prisma/client";
import { getFormDataValue } from "../getFormDataValue";
import { fetchAPI } from "./fetchAPI";

export const signUp = async (data: FormData) => {
  const formData = {
    email: getFormDataValue("email", data),
    name: getFormDataValue("name", data),
    password: getFormDataValue("password", data),
  };
  return await fetchAPI(`/api/users`, "POST", formData);
};

export const getUser = async (id: string): Promise<Partial<User>> => {
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

export const getSalon = async (id: string): Promise<Salon> => {
  return await fetchAPI(`/api/salons/${id}`, "GET", undefined, {
    tags: ["salon"],
  });
};

export const createSalon = async (data: Partial<Salon>) => {
  return await fetchAPI(`/api/salons`, "POST", data);
};

export const editSalon = async (id: string, data: Partial<Salon>) => {
  return await fetchAPI(`/api/salons/${id}`, "PUT", data);
};

export const deleteSalon = async (id: string) => {
  return await fetchAPI(`/api/salons/${id}`, "DELETE");
};

// Professionals
export const getProfessional = async (id: string): Promise<Professional> => {
  return await fetchAPI(`/api/professionals/${id}`, "GET");
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
export const getService = async (id: string): Promise<Service> => {
  return await fetchAPI(`/api/services/${id}`, "GET");
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

// Expenses
export const getExpense = async (id: string): Promise<Expense> => {
  return await fetchAPI(`/api/expenses/${id}`, "GET", undefined, {
    tags: ["expense"],
  });
};

export const createExpense = async (data: Partial<Expense>) => {
  return await fetchAPI(`/api/expenses`, "POST", data);
};

export const editExpense = async (id: string, data: Partial<Expense>) => {
  return await fetchAPI(`/api/expenses/${id}`, "PATCH", data);
};

export const deleteExpense = async (id: string) => {
  return await fetchAPI(`/api/expenses/${id}`, "DELETE");
};

// Taxes
export const getTax = async (id: string): Promise<Tax> => {
  return await fetchAPI(`/api/taxes/${id}`, "GET");
};

export const createTax = async (data: Partial<Tax>) => {
  return await fetchAPI(`/api/taxes`, "POST", data);
};

export const editTax = async (id: string, data: Partial<Tax>) => {
  return await fetchAPI(`/api/taxes/${id}`, "PATCH", data);
};

export const deleteTax = async (id: string) => {
  return await fetchAPI(`/api/taxes/${id}`, "DELETE");
};
