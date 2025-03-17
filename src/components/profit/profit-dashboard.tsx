"use client";

import { useProfitability } from "@/hooks/useProfitability";
import { ProfitabilityTable } from "./profit-page";
type ProfitDashboardType = {
  salonId: string;
};
export const ProfitDashboard = ({ salonId }: ProfitDashboardType) => {
  const { data, loading, error } = useProfitability(salonId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Lucratividade</h1>

      {loading && <p className="text-gray-500">Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data.length > 0 && <ProfitabilityTable data={data} />}
    </div>
  );
};
