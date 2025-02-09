"use client";

import { useModal } from "@/lib/context/modal-context";
import { SalesData } from "../../../types/db";
import Modal from "../modal";
import CustomerSearch from "../scheduler/search-customer";
import {
  Customer,
  Professional,
  Sale,
  SaleItem,
  Service,
} from "@prisma/client";
import { useState } from "react";
import { Button, Label, Select } from "flowbite-react";
import { SelectServices } from "./select-services";
import { createSale } from "@/lib/data/api-data";

type NewSaleModalType = {
  handleNewSale: (sale: SalesData) => void;
  professionals: Professional[];
  services: Service[];
};

export function NewSaleModal({
  handleNewSale,
  professionals = [],
  services = [],
}: NewSaleModalType) {
  const [sale, setSale] = useState<Partial<Sale>>({});
  const [saleItems, setSaleItems] = useState<Partial<SaleItem>[]>([]);
  const { close } = useModal();

  const handleCustomer = (customer: Partial<Customer>) => {
    setSale((prev) => ({ ...prev, customerId: customer.id }));
  };

  const handleSelectServices = async (
    selectedServices: Partial<SaleItem>[],
    totalAmount: number
  ) => {
    setSaleItems(selectedServices);
    setSale((prev) => ({ ...prev, totalAmount }));
  };
  const onSubmit = async () => {
    if (!sale || !saleItems) return;
    const data = { sale, saleItems };
    const newSale = await createSale(data);
    handleNewSale(newSale);
  };
  return (
    <Modal isOpen={true} close={close} size="small">
      <Modal.Title close={close}>Nova venda</Modal.Title>
      <Modal.Body>
        <CustomerSearch handleCustomer={handleCustomer} />
        <div className="mb-2 block">
          <Label htmlFor="professional" value="Profissional" />
        </div>
        <Select
          id="professional"
          value={sale?.professionalId || ""}
          onChange={(e) =>
            setSale((prev) => ({ ...prev, professionalId: e.target.value }))
          }
        >
          <option value="">Selecione um profissional</option>
          {professionals.map((professional) => (
            <option key={professional.id} value={professional.id}>
              {professional.name.toLowerCase()}
            </option>
          ))}
        </Select>
        <SelectServices services={services} onSubmit={handleSelectServices} />
        <div className="mb-2 block">
          <Label
            htmlFor="paymentMethod"
            value="Selecione o método de pagamento"
          />
        </div>
        <Select
          id="paymentMethod"
          required
          onChange={(e) =>
            setSale((prev) => ({ ...prev, paymentMethod: e.target.value }))
          }
        >
          <option value="">Selecione um método de pagamento</option>
          <option value="dinheiro">Dinheiro</option>
          <option value="pix">Pix</option>
          <option value="crédito">Crédito</option>
          <option value="débito">Débito</option>
          <option value="vários">Vários</option>
        </Select>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}
