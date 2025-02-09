import { useModal } from "@/lib/context/modal-context";

import { useState } from "react";
import Modal from "../modal";

import { Button } from "../ui/button";
import { Appointment, Customer, Service } from "@prisma/client";
import CustomerSearch from "./search-customer";
import { ChooseService } from "./choose-service";
import { createAppointment } from "@/lib/data/api-data";
import { AppointmentData } from "../../../types/db";

type NewAppointmentType = {
  appointmnetData: { professionalId?: string; date?: string };
  services: Service[];
  onSave: (NewAppointment: AppointmentData) => void;
};

export function NewAppointment({
  onSave,
  appointmnetData,
  services,
}: NewAppointmentType) {
  const { close } = useModal();
  const [appointment, setAppointment] = useState<Partial<Appointment>>({
    professionalId: appointmnetData.professionalId,
    date: new Date(appointmnetData.date as string),
    serviceId: services[0].id,
  });

  const handleSave = async () => {
    console.log(appointment);
    if (
      !appointment.customerId ||
      !appointment.professionalId ||
      !appointment.serviceId
    )
      return;
    try {
      const newAppointment = await createAppointment(appointment);
      console.log("oi");
      console.log(newAppointment);
      onSave(newAppointment);
    } catch (erro) {
      console.log(erro);
    }
    close();
  };

  const handleCustomer = async (customer: Partial<Customer>) => {
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      customerId: customer.id,
    }));
  };

  const handleSelectedService = (service: Service) => {
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      serviceId: service.id,
    }));
  };

  return (
    <Modal isOpen={true} close={close} size="large">
      <Modal.Title close={close}>Agendamento</Modal.Title>
      <Modal.Body>
        <div>
          <CustomerSearch handleCustomer={handleCustomer} />
          {appointment.customerId && (
            <ChooseService
              services={services}
              handleSelectedService={handleSelectedService}
            />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}
