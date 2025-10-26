"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { SiteTree } from "@/components/sites/SiteTree";
import { AssetTable } from "@/components/sites/AssetTable";
import { useSiteHierarchy } from "@/hooks/useSiteHierarchy";
import { useSiteAssets } from "@/hooks/useSiteAssets";

export default function SiteSupervisorPage() {
  const params = useParams<{ id: string }>();
  const siteId = useMemo(() => (typeof params?.id === "string" ? params.id : Array.isArray(params?.id) ? params?.id[0] : ""), [
    params,
  ]);
  const [riskFilter, setRiskFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: siteData, isLoading: isSiteLoading, isError: siteError } = useSiteHierarchy(siteId);
  const { data: assetsData, isFetching: isAssetsLoading, isError: assetsError } = useSiteAssets(siteId, {
    risk: riskFilter || undefined,
    q: searchTerm || undefined,
  });

  return (
    <AuthGuard allowed={["supervisor", "manager"]}>
      <div className="grid gap-6 lg:grid-cols-[minmax(240px,1fr)_minmax(360px,2fr)]">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Site overview</h1>
          {isSiteLoading ? <p className="text-sm text-slate-500">Loading site details…</p> : null}
          {siteError ? (
            <p className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              We were unable to load the site information.
            </p>
          ) : null}
          {siteData ? <SiteTree site={siteData.site} /> : null}
        </div>
        <div className="space-y-4">
          <header className="flex flex-col gap-1">
            <p className="text-sm font-medium text-slate-500">Supervisor view</p>
            <h2 className="text-xl font-semibold text-slate-900">{siteData?.site.name ?? "Site"}</h2>
            <p className="text-sm text-slate-500">
              Monitor building hierarchy, risk profile, and overdue assets.
            </p>
          </header>
          {isAssetsLoading ? <p className="text-sm text-slate-500">Refreshing assets…</p> : null}
          {assetsError ? (
            <p className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              Asset data could not be retrieved.
            </p>
          ) : null}
          <AssetTable
            assets={assetsData?.assets ?? []}
            riskFilter={riskFilter}
            searchTerm={searchTerm}
            onRiskChange={setRiskFilter}
            onSearchChange={setSearchTerm}
          />
        </div>
      </div>
    </AuthGuard>
  );
}
