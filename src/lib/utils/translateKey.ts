import { Service, Salon, Professional } from "@prisma/client";

export const translateKey = (
  key: keyof Service | keyof Salon | keyof Professional
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

    default:
      return key;
  }
};
