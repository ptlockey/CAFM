"use client";

import { useQuery } from "@tanstack/react-query";
import { SiteSummary } from "@/lib/types";

interface SiteHierarchyResponse {
  site: SiteSummary;
}

async function fetchSiteHierarchy(siteId: string): Promise<SiteHierarchyResponse> {
  const response = await fetch(`/api/sites/${siteId}`);
  if (!response.ok) {
    throw new Error("Failed to load site");
  }

  return response.json();
}

export function useSiteHierarchy(siteId: string) {
  return useQuery({
    queryKey: ["sites", siteId, "hierarchy"],
    queryFn: () => fetchSiteHierarchy(siteId),
    enabled: Boolean(siteId),
  });
}
