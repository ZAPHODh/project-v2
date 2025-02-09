"use client";

import { useModal } from "@/lib/context/modal-context";
import { useState } from "react";
import Modal from "../modal";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { Salon } from "@prisma/client";
import { translateKey } from "@/lib/utils/translateKey";
import { Spinner } from "flowbite-react";

type NewSalonType = {
  onSave: (newSalon: Partial<Salon>) => void;
};

export default function NewSalon({ onSave }: NewSalonType) {
  const { close } = useModal();
  const [salon, setSalon] = useState<Partial<Salon>>({});
  const [loadingCep, setLoadingCep] = useState(false);

  const salonKeys: (keyof Salon)[] = ["name", "cep", "address", "city"];

  const handleSave = () => {
    if (!salon) return;
    console.log(salon);
    onSave(salon);
    close();
  };

  const getInputValue = (key: keyof Salon) => {
    const value = salon[key];
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value || "";
  };
  const handleCepChange = async (cep: string) => {
    setSalon((prev) => ({ ...prev, cep }));
    if (cep.length === 8) {
      setLoadingCep(true);
      try {
        const response = await fetch(
          `https://brasilapi.com.br/api/cep/v2/${cep}`
        );
        if (!response.ok) {
          throw new Error("CEP não encontrado");
        }
        const data = await response.json();
        setSalon((prev) => ({
          ...prev,
          address: data.street || "",
          city: data.city || "",
        }));
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      } finally {
        setLoadingCep(false);
      }
    }
  };
  return (
    <Modal isOpen={true} close={close} size="small">
      <Modal.Title close={close}>Crie seu Salão</Modal.Title>
      <Modal.Body>
        {salonKeys.map((key) => (
          <Input
            disabled={key == "address" || key == "city" ? true : false}
            key={key}
            type="text"
            name={key}
            label={translateKey(key)}
            value={getInputValue(key)}
            onChange={(e) => {
              const value = e.target.value;
              if (key === "cep") {
                handleCepChange(value);
              } else {
                setSalon((prevSalon) => ({
                  ...prevSalon,
                  [key]: value,
                }));
              }
            }}
          />
        ))}
        {loadingCep && <Spinner aria-label="Carregando endereço" />}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
}
