"use client";

import { SaleItem, Service } from "@prisma/client";
import { Label, Select, Button, TextInput } from "flowbite-react";
import { XCircleIcon, PencilIcon } from "lucide-react";
import { useState } from "react";

type SelectServicesType = {
  services: Service[];
  onSubmit: (
    selectedServices: Partial<SaleItem>[],
    totalAmount: number
  ) => void;
};

export function SelectServices({ services, onSubmit }: SelectServicesType) {
  const [selectedServices, setSelectedServices] = useState<
    { id: string; quantity: number; price: number }[]
  >([]);
  const [isClosed, setIsClosed] = useState(false);

  const handleAddService = () => {
    setSelectedServices([
      ...selectedServices,
      { id: "", quantity: 1, price: 0 },
    ]);
  };

  const handleServiceChange = (index: number, id: string) => {
    const service = services.find((service) => service.id === id);
    setSelectedServices((prev) =>
      prev.map((serviceItem, i) =>
        i === index
          ? { ...serviceItem, id, price: service ? service.price : 0 }
          : serviceItem
      )
    );
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    if (quantity < 1) return;
    setSelectedServices((prev) =>
      prev.map((serviceItem, i) =>
        i === index ? { ...serviceItem, quantity } : serviceItem
      )
    );
  };

  const handleRemoveService = (index: number) => {
    setSelectedServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (selectedServices.length > 0) {
      const totalAmount = selectedServices.reduce((total, selectedService) => {
        const service = services.find((s) => s.id === selectedService.id);
        if (service) {
          return total + service.price * selectedService.quantity;
        }
        return total;
      }, 0);

      onSubmit(selectedServices, totalAmount);
      setIsClosed(true);
    }
  };

  return (
    <div
      className={`my-4 p-4 border-2 rounded-md transition-all ${
        isClosed ? "bg-gray-800 opacity-70 " : "bg-gray-800"
      }`}
    >
      {!isClosed ? (
        <>
          <div className="mb-2 block">
            <Label value="Serviços" />
          </div>

          {selectedServices.map((selectedService, index) => (
            <div key={index} className="mb-4 flex items-center gap-4">
              <Select
                value={selectedService.id}
                onChange={(e) => handleServiceChange(index, e.target.value)}
                className="flex-1"
              >
                <option value="">Selecione um serviço</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </Select>

              <div className="flex items-center gap-2">
                <Button
                  color="gray"
                  onClick={() =>
                    handleQuantityChange(index, selectedService.quantity - 1)
                  }
                >
                  -
                </Button>
                <TextInput
                  type="number"
                  min={1}
                  value={selectedService.quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, Number(e.target.value))
                  }
                  className="w-16 text-center"
                />
                <Button
                  color="gray"
                  onClick={() =>
                    handleQuantityChange(index, selectedService.quantity + 1)
                  }
                >
                  +
                </Button>
                <button
                  onClick={() => handleRemoveService(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>
              <span className="text-gray-500 text-sm">
                Preço Unitário: R${selectedService.price.toFixed(2)}
              </span>
            </div>
          ))}
          <div className="flex gap-4 mt-4">
            <Button onClick={handleAddService} className="mt-2" color="gray">
              Adicionar Serviço
            </Button>
            <Button
              color="green"
              onClick={handleSubmit}
              className="mt-2 flex items-center"
              disabled={selectedServices.length === 0}
            >
              Pronto!
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Serviços adicionados!</span>
          <button
            onClick={() => setIsClosed(false)}
            className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
          >
            <PencilIcon className="w-5 h-5" />
            Editar
          </button>
        </div>
      )}
    </div>
  );
}
