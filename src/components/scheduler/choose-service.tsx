"use client";
import { Service } from "@prisma/client";
import { Label, Select, Toast } from "flowbite-react";
import Link from "next/link";
import { MdMedicalServices } from "react-icons/md";

type ChooseServiceType = {
  services: Service[];
  handleSelectedService: (service: Service) => void;
};

export function ChooseService({
  services,
  handleSelectedService,
}: ChooseServiceType) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedServiceId = event.target.value;
    const selectedService = services.find(
      (service) => service.id === selectedServiceId
    );
    if (selectedService) {
      handleSelectedService(selectedService);
    }
  };
  return (
    <div className="max-w-md">
      {services.length > 0 ? (
        <>
          <div className="mb-2 block">
            <Label htmlFor="services" value="Selecione o serviço" />
          </div>
          <Select id="services" required onChange={handleChange}>
            {services.map((service) => (
              <option key={service.id}>{service.name}</option>
            ))}
          </Select>
        </>
      ) : (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            <MdMedicalServices className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Sem serviços.{" "}
            <Link className="underline semi-bold" href={"/salon/services"}>
              Adicione serviços
            </Link>
          </div>
          <Toast.Toggle />
        </Toast>
      )}
    </div>
  );
}
