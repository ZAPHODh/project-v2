"use client";

import { Professional } from "@prisma/client";

type ProfessionalProfileType = {
  professional: Professional;
};

export function ProfessionalProfile({ professional }: ProfessionalProfileType) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file);
    }
  };
  return (
    <div className="w-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded">
      <div className="flex flex-col items-start text-start">
        {professional.profile ? (
          <img
            className="w-20 h-20 mb-3 rounded"
            src={professional.profile}
            alt={`${professional.name}'s avatar`}
          />
        ) : (
          <div className="w-20 h-20 mb-3 rounded flex items-center justify-center bg-gray-900 text-gray-500 hover:bg-gray-700 relative">
            <label
              htmlFor="add-image"
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
            >
              <span className="text-2xl font-bold">+</span>
            </label>
            <input
              id="add-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}
        <h3 className="mb-1 text-xl font-bold">{professional.name}</h3>
        <div className="flex flex-row gap-1 items-center">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 -960 960 960"
              fill="currentColor"
            >
              <path d="M200-80 40-520l200-120v-240h160v240l200 120L440-80H200Zm480 0q-17 0-28.5-11.5T640-120q0-17 11.5-28.5T680-160h120v-80H680q-17 0-28.5-11.5T640-280q0-17 11.5-28.5T680-320h120v-80H680q-17 0-28.5-11.5T640-440q0-17 11.5-28.5T680-480h120v-80H680q-17 0-28.5-11.5T640-600q0-17 11.5-28.5T680-640h120v-80H680q-17 0-28.5-11.5T640-760q0-17 11.5-28.5T680-800h160q33 0 56.5 23.5T920-720v560q0 33-23.5 56.5T840-80H680Zm-424-80h128l118-326-124-74H262l-124 74 118 326Zm64-200Z" />
            </svg>
          </span>
          <p className="text-sm ">{professional.categroy}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div>
          <span className="font-medium text-gray-400">Email</span>
          <p>{professional.email}</p>
        </div>
        <div>
          <span className="font-medium text-gray-400">Endereço</span>
          <p>{professional.adress || "Not provided"}</p>
        </div>
        <div>
          <span className="font-medium text-gray-400">Telefone</span>
          <p>{professional.phone}</p>
        </div>
      </div>

      <div className="mt-4"></div>
    </div>
  );
}
