"use client";

import { useState, useEffect } from "react";

interface ProfitabilityData {
  serviceId: string;
  serviceName: string;
  idealRevenue: number;
  realRevenue: number;
  totalCosts: number;
  idealProfit: number;
  realProfit: number;
  profitPercentage: string;
}

export const useProfitability = (salonId: string) => {
  const [data, setData] = useState<ProfitabilityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!salonId) return;

    const fetchProfitability = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/profitability?salonId=${salonId}`);
        const result = await response.json();
        if (response.ok) {
          setData(result);
        } else {
          setError(result.error || "Erro ao buscar dados");
        }
      } catch (err) {
        setError("Erro ao conectar à API");
      } finally {
        setLoading(false);
      }
    };

    fetchProfitability();
  }, [salonId]);

  return { data, loading, error };
};
