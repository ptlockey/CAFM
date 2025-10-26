"use client";

import { useQuery } from "@tanstack/react-query";
import { AssetSummary } from "@/lib/types";

export interface AssetDetailResponse {
  asset: AssetSummary;
}

async function fetchAsset(assetId: string): Promise<AssetDetailResponse> {
  const response = await fetch(`/api/assets/${assetId}`);
  if (!response.ok) {
    throw new Error("Failed to load asset");
  }

  return response.json();
}

export function useAssetDetail(assetId?: string) {
  return useQuery({
    queryKey: ["assets", assetId],
    queryFn: () => fetchAsset(assetId as string),
    enabled: Boolean(assetId),
  });
}
