"use client";
import { Customer } from "@prisma/client";
import { useState } from "react";

import Input from "../ui/input";
import { Card } from "flowbite-react";

import { Toast } from "flowbite-react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Button } from "flowbite-react";
import { translateKey } from "@/lib/utils/translateKey";
import { createCustomer } from "@/lib/data/api-data";

type CustomerSearchProps = {
  handleCustomer: (customer: Partial<Customer>) => void;
  defaultCustomer?: Customer;
};

const CustomerSearch = ({
  handleCustomer,
  defaultCustomer,
}: CustomerSearchProps) => {
  const [addCustomer, setAddCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>();
  const [query, setQuery] = useState(defaultCustomer?.name || "");
  const [results, setResults] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState(false);

  const customerKeys: (keyof Customer)[] = [
    "name",
    "address",
    "city",
    "phone",
    "genre",
    "email",
  ];

  const handleNewCustomer = async () => {
    if (!newCustomer) return;
    const customer = await createCustomer(newCustomer);
    handleCustomer(customer);
    setQuery(customer.name);
    setSelectedCustomer(true);
    setAddCustomer(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await fetch(`/api/customer/search?query=${query}`);
      const data: Customer[] = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Error searching customers:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex flex-col lg:flex-row gap-3 items-end"
      >
        <div className="w-full flex items-center">
          <Input
            disabled={selectedCustomer}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            label="Cliente"
            name="Cliente"
          />
          {selectedCustomer && (
            <Button
              className="mt-8 ml-2"
              onClick={() => setSelectedCustomer(false)}
              color="failure"
            >
              X
            </Button>
          )}
        </div>

        <Button
          disabled={selectedCustomer}
          color="gray"
          type="submit"
          className="mb-2"
        >
          Pesquisar
        </Button>
      </form>

      <div className="mt-4">
        {results.length > 0 ? (
          <Card className="max-w-sm flex">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {results.map((customer) => (
                <li key={customer.id} className="pb-3 sm:pb-4 py-2">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {customer.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {customer.email}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {customer.phone}
                      </p>
                    </div>
                    <Button
                      color="gray"
                      className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                      onClick={() => {
                        handleCustomer(customer);
                        setQuery(customer.name);
                        setSelectedCustomer(true);
                        setAddCustomer(false);
                        setResults([]);
                      }}
                    >
                      Selecionar
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ) : (
          <>
            {!selectedCustomer && query.trim() && results.length === 0 && (
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                  <BsFillPersonPlusFill className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">
                  Sem clientes encontrados
                </div>
                <Button color="gray" onClick={() => setAddCustomer(true)}>
                  Adicionar
                </Button>
              </Toast>
            )}
            {addCustomer && (
              <form action="" className="max-w-xs">
                {customerKeys.map((key) => (
                  <Input
                    key={key}
                    label={translateKey(key)}
                    name={translateKey(key)}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewCustomer((prevCustomer) => ({
                        ...prevCustomer,
                        [key]: value,
                      }));
                    }}
                  ></Input>
                ))}
                <Button onClick={handleNewCustomer}>Cadastrar</Button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerSearch;
