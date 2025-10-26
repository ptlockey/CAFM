"use client";

import { useState } from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { ScanInput } from "@/components/scan/ScanInput";
import { AssetDetailCard } from "@/components/scan/AssetDetailCard";
import { FlushForm } from "@/components/scan/FlushForm";
import { useAssetDetail } from "@/hooks/useAssetDetail";

export default function TechnicianScanPage() {
  const [assetId, setAssetId] = useState<string | undefined>(undefined);
  const { data, isLoading, isError } = useAssetDetail(assetId);

  return (
    <AuthGuard allowed={["technician", "manager"]}>
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Technician scan mode</h1>
          <p className="text-sm text-slate-600">
            Scan a QR code to load asset details and capture your flush record even when offline.
          </p>
          <ScanInput onScan={setAssetId} />
        </header>
        {isLoading ? <p className="text-sm text-slate-500">Loading asset details…</p> : null}
        {isError ? (
          <p className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            Asset could not be found. Check the QR code or try again later.
          </p>
        ) : null}
        {data?.asset ? <AssetDetailCard asset={data.asset} /> : null}
        {assetId && data?.asset ? (
          <FlushForm assetId={data.asset.id} siteId={data.asset.siteId} />
        ) : (
          <p className="rounded-md border border-dashed border-slate-300 p-6 text-sm text-slate-500">
            Scan an asset to start a new flush record.
          </p>
        )}
      </div>
    </AuthGuard>
  );
}
