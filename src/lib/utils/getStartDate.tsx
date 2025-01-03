import moment from "moment";

export const getStartDate = (period: string): string => {
  const now = new Date();
  switch (period) {
    case "Ultimos 7 dias":
      return moment(now).subtract(7, "days").toISOString();
    case "Ultimos 30 dias":
      return moment(now).subtract(30, "days").toISOString();
    case "Ultimos 6 meses":
      return moment(now).subtract(6, "months").toISOString();
    default:
      throw new Error("Período inválido");
  }
};
