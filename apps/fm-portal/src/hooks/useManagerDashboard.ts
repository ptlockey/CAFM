"use client";

import { useQuery } from "@tanstack/react-query";
import { ManagerMetrics } from "@/lib/types";

async function fetchManagerMetrics(): Promise<ManagerMetrics> {
  const response = await fetch("/api/manager/metrics");
  if (!response.ok) {
    throw new Error("Failed to load manager metrics");
  }
  return response.json();
}

export function useManagerDashboard() {
  return useQuery({
    queryKey: ["manager", "metrics"],
    queryFn: fetchManagerMetrics,
  });
}
