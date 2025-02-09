"use client";

import { useModal } from "@/lib/context/modal-context";
import { CustomerData, SalesData } from "../../../types/db";
import Modal from "../modal";
import CustomerSearch from "../scheduler/search-customer";
import { Customer, Sale } from "@prisma/client";
import { useState } from "react";

type NewSaleModalType = {
  handleNewSale: (sale: SalesData) => void;
};

export function NewSaleModal({ handleNewSale }: NewSaleModalType) {
  const [sale, setSale] = useState<Partial<Sale>>();
  const { close } = useModal();
  const handleCustomer = (customer: Partial<Customer>) => {
    setSale((prev) => ({ ...prev, customerId: customer.id }));
  };
  return (
    <Modal isOpen={true} close={close} size="small">
      <Modal.Title close={close}>Nova venda</Modal.Title>
      <Modal.Body>
        <CustomerSearch handleCustomer={handleCustomer} />
      </Modal.Body>
      <Modal.Footer>a</Modal.Footer>
    </Modal>
  );
}
