import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { AppointmentData } from "../../../types/db";

export const exportToPDF = (data: AppointmentData[]) => {
  const doc = new jsPDF();
  doc.text("Agenda de Clientes", 14, 10);
  autoTable(doc, {
    head: [["Serviço", "Profissional", "Valor", "Data", "Finalizado"]],
    body: data.map((appointment) => [
      appointment.service.name,
      appointment.professional.name,
      `R$ ${appointment.service.price.toFixed(2)}`,
      new Date(appointment.date).toLocaleDateString("pt-BR"),
      appointment.status === "completed" ? "Sim" : "Não",
    ]),
  });
  doc.save("agenda.pdf");
};

export const exportToImage = async () => {
  const tableElement = document.querySelector("table");
  if (!tableElement) return;

  const canvas = await html2canvas(tableElement);
  const imgData = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = imgData;
  link.download = "agenda.png";
  link.click();
};

export const exportToExcel = (data: AppointmentData[]) => {
  const ws = XLSX.utils.json_to_sheet(
    data.map((appointment) => ({
      Serviço: appointment.service.name,
      Profissional: appointment.professional.name,
      Valor: `R$ ${appointment.service.price.toFixed(2)}`,
      Data: new Date(appointment.date).toLocaleDateString("pt-BR"),
      Finalizado: appointment.status === "completed" ? "Sim" : "Não",
    }))
  );

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Agenda");
  XLSX.writeFile(wb, "agenda.xlsx");
};
