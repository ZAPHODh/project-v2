"use client";

import { X } from "lucide-react";
import { FormEvent, useState } from "react";
export type FilterType = "lowPrice" | "mostTimer" | "highPrice" | null;

type ServiceConsoleType = {
  addService: () => void;
  action: (action: "report" | "deleteAll") => void;
  filter: (filter: FilterType) => void;
  activeFilter: FilterType;
  searchService: (name: string) => void;
  searchInput: { name: string; searchInput: boolean } | null;
  cancelsearchInput: () => void;
};

export default function ServiceConsole({
  cancelsearchInput,
  filter,
  searchInput,
  activeFilter,
  action,
  addService,
  searchService,
}: ServiceConsoleType) {
  const [search, setSearch] = useState<string>("");
  const [isActionsDropdownOpen, setActionsDropdownOpen] = useState(false);
  const [issearchInputDropdownOpen, setsearchInputDropdownOpen] =
    useState(false);

  const toggleActionsDropdown = () => {
    setActionsDropdownOpen((prev) => !prev);
    setsearchInputDropdownOpen(false);
  };

  const togglesearchInputDropdown = () => {
    setsearchInputDropdownOpen((prev) => !prev);
    setActionsDropdownOpen(false);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    searchService(search);
  };
  const handleActionClick = (act: "report" | "deleteAll") => {
    action(act);
  };
  const handleFilterInput = (input: FilterType) => {
    filter(input);
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <div className="w-full md:w-1/2">
        <form className="flex items-center" onSubmit={onSubmit}>
          <label htmlFor="simple-search" className="sr-only">
            Pesquisar
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search"
            />
          </div>
        </form>
      </div>
      {searchInput && (
        <div className="flex items-center min-w-4 rounded-full bg-gray-900 px-3 py-1 text-sm font-semibold text-white shadow-sm">
          {searchInput.name}{" "}
          <button
            onClick={cancelsearchInput}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
      )}
      <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
        <button
          onClick={addService}
          type="button"
          className="flex items-center justify-center focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          <svg
            className="h-3.5 w-3.5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            />
          </svg>
          Adicionar Serviço
        </button>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative">
            <button
              id="actionsDropdownButton"
              onClick={toggleActionsDropdown}
              className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              type="button"
            >
              <svg
                className="-ml-1 mr-1.5 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
              Ações
            </button>
            {isActionsDropdownOpen && (
              <div
                id="actionsDropdown"
                className="absolute top-[45px] z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="actionsDropdownButton"
                >
                  <li>
                    <button
                      onClick={() => handleActionClick("report")}
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Gerar relatório
                    </button>
                  </li>
                </ul>
                <div className="py-1">
                  <a
                    onClick={() => handleActionClick("deleteAll")}
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Deletar tudo
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={togglesearchInputDropdown}
              className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-4 w-4 mr-2 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              Filtro
              <svg
                className="-mr-1 ml-1.5 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </button>
            {issearchInputDropdownOpen && (
              <div
                id="searchInputDropdown"
                className="absolute top-[45px] right-[1px] z-10 w-[180px] p-3 bg-white rounded-lg shadow dark:bg-gray-700"
              >
                <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                  Escolha um
                </h6>
                <ul
                  className="space-y-2 text-sm"
                  aria-labelledby="searchInputDropdownButton"
                >
                  <li className="flex items-center">
                    <input
                      onChange={(e) =>
                        handleFilterInput(e.target.value as FilterType)
                      }
                      type="checkbox"
                      checked={activeFilter === "mostTimer"}
                      value="mostTimer"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                      Maior duração
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      type="checkbox"
                      value="highPrice"
                      checked={activeFilter === "highPrice"}
                      onChange={(e) =>
                        handleFilterInput(e.target.value as FilterType)
                      }
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                      Maior Preço
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      type="checkbox"
                      value="lowPrice"
                      checked={activeFilter === "lowPrice"}
                      onChange={(e) =>
                        handleFilterInput(e.target.value as FilterType)
                      }
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                      Menor Preço
                    </label>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
