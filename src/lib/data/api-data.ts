import {
  Appointment,
  Customer,
  Expense,
  ExpenseCategory,
  Professional,
  Sale,
  SaleItem,
  Service,
  User,
} from "@prisma/client";
import { getFormDataValue } from "../getFormDataValue";
import { fetchAPI } from "./fetchAPI";

import {
  AppointmentData,
  CustomerData,
  ExpenseData,
  ProfessionalData,
  SalesData,
  salonData,
} from "../../../types/db";

export const signUp = async (data: FormData) => {
  const formData = {
    email: getFormDataValue("email", data),
    name: getFormDataValue("name", data),
    password: getFormDataValue("password", data),
  };
  const response = await fetchAPI(`/api/users`, "POST", formData, {
    skipAuth: true,
  });
  return response;
};

export const getUser = async (id: string): Promise<User | { name: string }> => {
  const response = await fetchAPI(`/api/users/${id}`, "GET", undefined);

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

export const getServices = async (): Promise<Service[]> => {
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

export const getExpenses = async (): Promise<ExpenseData[]> => {
  return await fetchAPI(`/api/expenses`, "GET", undefined, {
    tags: ["expense"],
  });
};

export const createExpense = async (
  data: Partial<Expense>
): Promise<ExpenseData> => {
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

//sales

export const getSales = async (): Promise<SalesData[]> => {
  return await fetchAPI(`/api/sales`, "GET", undefined, {
    tags: ["sale"],
  });
};

// Customer
export const getCustomer = async (id: string): Promise<CustomerData> => {
  return await fetchAPI(`/api/customer/${id}`, "GET");
};
export const editCustomer = async (
  id: string,
  data: Partial<CustomerData>
): Promise<CustomerData> => {
  return await fetchAPI(`/api/customer/${id}`, "PUT", data);
};

export const getCustomers = async (): Promise<Customer[]> => {
  return await fetchAPI(`/api/customer/`, "GET");
};

export const createCustomer = async (
  data: Partial<Customer>
): Promise<Customer> => {
  return await fetchAPI(`/api/customer`, "POST", data);
};

// Appointment
export const getAppointment = async (id: string): Promise<Appointment> => {
  return await fetchAPI(`/api/appointment/${id}`, "GET");
};
export const getAppointments = async (): Promise<AppointmentData[]> => {
  return await fetchAPI(`/api/appointment/`, "GET");
};

export const createAppointment = async (
  data: Partial<Appointment>
): Promise<AppointmentData> => {
  return await fetchAPI(`/api/appointment`, "POST", data);
};

export const editAppointment = async (
  id: string,
  data: Partial<Appointment>
): Promise<AppointmentData> => {
  return await fetchAPI(`/api/appointment/${id}`, "PATCH", data);
};

//expenseCategory
export const getExpenseCategory = async (
  id: string
): Promise<ExpenseCategory> => {
  return await fetchAPI(`/api/expenseCategory/${id}`, "GET");
};
export const editExpenseCategory = async (
  id: string,
  data: Partial<ExpenseCategory>
): Promise<CustomerData> => {
  return await fetchAPI(`/api/expenseCategory/${id}`, "PUT", data);
};

export const getExpensesCategory = async (): Promise<ExpenseCategory[]> => {
  return await fetchAPI(`/api/expenseCategory/`, "GET");
};

export const createExpenseCategory = async (
  data: Partial<ExpenseCategory>
): Promise<ExpenseCategory> => {
  return await fetchAPI(`/api/expenseCategory`, "POST", data);
};

//sale
export const createSale = async (data: {
  sale: Partial<Sale>;
  saleItems: Partial<SaleItem>[];
}): Promise<SalesData> => {
  return await fetchAPI(`/api/sales`, "POST", data);
};
