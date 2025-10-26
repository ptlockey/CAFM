"use client";

import { useQuery } from "@tanstack/react-query";
import { AssetSummary } from "@/lib/types";

export interface SiteAssetsResponse {
  assets: AssetSummary[];
}

async function fetchSiteAssets(siteId: string, params: { risk?: string; q?: string }) {
  const searchParams = new URLSearchParams();
  if (params.risk) {
    searchParams.set("risk", params.risk);
  }
  if (params.q) {
    searchParams.set("q", params.q);
  }

  const queryString = searchParams.toString();
  const response = await fetch(
    queryString ? `/api/sites/${siteId}/assets?${queryString}` : `/api/sites/${siteId}/assets`,
  );
  if (!response.ok) {
    throw new Error("Failed to load assets");
  }
  return response.json() as Promise<SiteAssetsResponse>;
}

export function useSiteAssets(siteId: string, params: { risk?: string; q?: string }) {
  const queryKey = ["sites", siteId, "assets", params.risk ?? "", params.q ?? ""] as const;
  return useQuery({
    queryKey,
    queryFn: () => fetchSiteAssets(siteId, params),
    enabled: Boolean(siteId),
  });
}
