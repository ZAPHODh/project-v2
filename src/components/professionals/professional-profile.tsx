"use client";

import { editProfessional } from "@/lib/data/api-data";
import { Professional } from "@prisma/client";
import { CldImage } from "next-cloudinary";

import { useEffect, useState } from "react";
import { AvatarUploader } from "./avatar-uploader";

type ProfessionalProfileType = {
  professional: Professional;
};

export function ProfessionalProfile({ professional }: ProfessionalProfileType) {
  const [profile, setProfile] = useState<string | undefined | null>(
    professional.profile
  );
  const onUploadSucess = async (url: string) => {
    try {
      await editProfessional(professional.id, { profile: url });
      setProfile(url);
    } catch {}
  };

  useEffect(() => {
    setProfile(professional.profile);
  }, [professional]);

  return (
    <div className="w-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded">
      <div className="flex flex-col items-start text-start">
        {profile ? (
          <CldImage
            className="rounded"
            width="80"
            height="80"
            crop={{
              type: "auto",
              source: true,
            }}
            src={profile}
            alt={`${professional.name}'s avatar`}
          />
        ) : (
          <AvatarUploader onUploadSuccess={onUploadSucess} />
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
          <p>{professional.address?.toUpperCase() || "Not provided"}</p>
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
