"use client";

import { Button, Label, Radio, Select, Textarea } from "flowbite-react";
import { AppointmentData, Status } from "../../../types/db";

import CustomerSearch from "./search-customer";
import { useState } from "react";
import { Customer, Service } from "@prisma/client";
import { translateKey } from "@/lib/utils/translateKey";
import { editAppointment } from "@/lib/data/api-data";
import Modal from "../modal";
import { useModal } from "@/lib/context/modal-context";
type UpdateAppointmentType = {
  onSave: (updatedAppontment: AppointmentData) => void;
  appointment: AppointmentData;
  services: Service[];
};
export function UpdateAppointment({
  appointment,
  onSave,
  services,
}: UpdateAppointmentType) {
  const { close } = useModal();
  const [updatedAppointment, setUpdatedAppointment] = useState(appointment);

  const handleSave = async () => {
    const editedAppointment = await editAppointment(updatedAppointment.id, {
      customerId: updatedAppointment.customerId,
      date: updatedAppointment.date,
      notes: updatedAppointment.notes,
      serviceId: updatedAppointment.serviceId,
      professionalId: updatedAppointment.professionalId,
      status: updatedAppointment.status,
    });
    onSave(editedAppointment);
    close();
  };

  const handleCustomer = (customer: Partial<Customer>) => {
    setUpdatedAppointment((prev) => ({
      ...prev,
      customerId: customer.id as string,
    }));
  };
  return (
    <Modal isOpen={true} close={close} size="large">
      <Modal.Title close={close}>Detalhes do agendamento</Modal.Title>
      <Modal.Body>
        <CustomerSearch
          handleCustomer={handleCustomer}
          defaultCustomer={appointment.customer}
        />
        <div className="mb-4">
          <Label className="block text-sm font-medium">Serviço</Label>
          <Select
            value={updatedAppointment.serviceId}
            onChange={(e) =>
              setUpdatedAppointment((prev) => ({
                ...prev,
                serviceId: e.target.value,
              }))
            }
            className="mt-1 w-full"
          >
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="mb-4">
          <Label className="block text-sm font-medium">Status</Label>
          <div className="flex gap-4 mt-2">
            {["pending", "confirmed", "canceled", "completed"].map((status) => (
              <Label key={status} className="flex items-center gap-2">
                <Radio
                  name="status"
                  value={status}
                  checked={updatedAppointment.status === status}
                  onChange={(e) =>
                    setUpdatedAppointment((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                />
                {translateKey(status as Status)}
              </Label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <Label className="block text-sm font-medium">Notas</Label>
          <Textarea
            placeholder="Adicione observações..."
            value={updatedAppointment.notes || ""}
            onChange={(e) =>
              setUpdatedAppointment((prev) => ({
                ...prev,
                notes: e.target.value,
              }))
            }
            className="mt-1 w-full"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}
