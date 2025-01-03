"use client";

import { Service } from "@prisma/client";

import { useState } from "react";
import { ModalProvider } from "@/lib/context/modal-context";
import EditService from "./edit-service";
import {
  createService,
  deleteService,
  deleteServices,
  editService,
} from "@/lib/data/api-data";
import ServiceConsole, { FilterType } from "./service-console";
import ServiceNav from "./service-nav";
import NewService from "./new-service";

type ServiceTableType = {
  services: (Partial<Service> | undefined)[];
};

export default function ServiceTable({ services = [] }: ServiceTableType) {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const [searchInput, setSearchInput] = useState<{
    name: string;
    searchInput: boolean;
  } | null>(null);
  const [cachedServices, setCachedServices] = useState(services);
  const [currentService, setCurrentService] = useState<Partial<Service>>();
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(cachedServices.length / itemsPerPage);
  const visibleServices = cachedServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleServiceOptions = (id: string) => {
    setActiveServiceId((prev) => (prev === id ? null : id));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onClick = async ({
    id,
    name,
    duration,
    description,
    price,
  }: Partial<Service>) => {
    setIsUpdateModalOpen(true);
    setCurrentService({ id, name, duration, description, price });
  };

  const handleSave = async (updatedService: Partial<Service>) => {
    await editService(updatedService.id as string, updatedService);
  };

  const handleNewService = async (newService: Partial<Service>) => {
    try {
      const service = await createService(newService);
      setCachedServices((prevServices) => [...prevServices, service]);
    } catch {
      console.log("erro");
    }
  };

  const addService = () => {
    setIsNewModalOpen(true);
  };

  const searchService = (name: string) => {
    const mappedSearch = cachedServices.filter((service) =>
      service?.name?.toLowerCase().includes(name.toLowerCase())
    );
    setCachedServices(mappedSearch);
    setSearchInput({ name, searchInput: true });
  };

  const cancelSearchInput = () => {
    setSearchInput(null);
    setCachedServices(services);
  };

  const action = async (action: "report" | "deleteAll") => {
    switch (action) {
      case "report":
        return;
      case "deleteAll":
        await deleteServices();
        setCachedServices([]);

        return;
      default:
        return;
    }
  };

  const filter = (filter: FilterType) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
      setCachedServices(services);
    } else {
      setActiveFilter(filter);
      switch (filter) {
        case "highPrice":
          const mappedServiceHighPrice = services
            .filter((service) => service?.price !== undefined)
            .sort((a, b) => (b?.price ?? 0) - (a?.price ?? 0));
          setCachedServices(mappedServiceHighPrice);
          break;
        case "lowPrice":
          const mappedServiceLowPrice = services
            .filter((service) => service?.price !== undefined)
            .sort((a, b) => (a?.price ?? 0) - (b?.price ?? 0));
          setCachedServices(mappedServiceLowPrice);
          break;
        case "mostTimer":
          const mappedServiceMostTimer = services
            .filter((service) => service?.duration !== undefined)
            .sort((a, b) => (b?.duration ?? 0) - (a?.duration ?? 0));
          setCachedServices(mappedServiceMostTimer);
          break;
      }
    }
  };
  const handleDelete = async () => {
    if (!activeServiceId) return;
    try {
      await deleteService(activeServiceId);
      setCachedServices((services) =>
        services.filter((service) => service?.id !== activeServiceId)
      );
    } catch (error) {
      console.error("Erro ao deletar serviço:", error);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <ServiceConsole
        activeFilter={activeFilter}
        filter={filter}
        action={action}
        addService={addService}
        searchService={searchService}
        searchInput={searchInput}
        cancelsearchInput={cancelSearchInput}
      />

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Nome do serviço
            </th>
            <th scope="col" className="px-4 py-3">
              Preço
            </th>
            <th scope="col" className="px-4 py-3">
              Duração
            </th>
            <th scope="col" className="px-4 py-3">
              Descrição
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleServices.map((service) => (
            <tr className="border-b dark:border-gray-700" key={service?.id}>
              <td
                scope="row"
                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {service?.name}
              </td>
              <td className="px-6 py-4">R$ {service?.price?.toFixed(2)}</td>
              <td className="px-6 py-4">
                {service?.duration
                  ? service.duration >= 60
                    ? `${service.duration / 60}h`
                    : `${service.duration}m`
                  : "N/A"}
              </td>
              <td className="px-6 py-4">{service?.description}</td>
              <td className="px-4 py-3 flex items-center justify-end">
                <div className="relative">
                  <button
                    onClick={() => toggleServiceOptions(service?.id as string)}
                    className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                    type="button"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                  {activeServiceId === service?.id && (
                    <div className="absolute top-[20px] right-[10px] z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <button
                            onClick={() => onClick(service)}
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                          >
                            Editar
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={handleDelete}
                            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                          >
                            Deletar
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ServiceNav
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isUpdateModalOpen && currentService && (
        <ModalProvider close={() => setIsUpdateModalOpen(false)}>
          <EditService
            currentService={currentService}
            onSave={async (updatedValue: Partial<Service>) =>
              handleSave(updatedValue)
            }
          />
        </ModalProvider>
      )}
      {isNewModalOpen && (
        <ModalProvider close={() => setIsNewModalOpen(false)}>
          <NewService
            onSave={(newService: Partial<Service>) =>
              handleNewService(newService)
            }
          />
        </ModalProvider>
      )}
    </div>
  );
}
