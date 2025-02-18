import { Service, Salon, Professional, Customer, User } from "@prisma/client";
import {
  CustomerData,
  ExpenseData,
  SalesData,
  Status,
} from "../../../types/db";

export const translateKey = (
  key:
    | keyof Service
    | keyof Salon
    | keyof Professional
    | keyof Customer
    | Status
    | keyof CustomerData
    | keyof ExpenseData
    | keyof SalesData
    | keyof User
) => {
  switch (key) {
    case "name":
      return "Nome";
    case "duration":
      return "Duração (em minutos)";
    case "description":
      return "Descrição";
    case "price":
      return "Preço";
    case "createdAt":
      return "Criado em";
    case "updatedAt":
      return "Atualizado em";
    case "address":
      return "Endereço";
    case "city":
      return "Cidade";
    case "categroy":
      return "Categoria";
    case "cpf":
      return "CPF";
    case "profile":
      return "Foto";
    case "phone":
      return "Telefone";
    case "cep":
      return "CEP";
    case "email":
      return "Email";
    case "birthDay":
      return "Aniversário";
    case "genre":
      return "Gênero";
    case "pending":
      return "Pendente";
    case "confirmed":
      return "Confirmado";
    case "canceled":
      return "Cancelado";
    case "completed":
      return "Finalizado";
    case "amount":
      return "Valor";
    case "subscriptionRole":
      return "Plano";
    default:
      return key;
  }
};
