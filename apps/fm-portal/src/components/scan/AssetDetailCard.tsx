import { AssetSummary } from "@/lib/types";

interface AssetDetailCardProps {
  asset: AssetSummary;
}

export function AssetDetailCard({ asset }: AssetDetailCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">{asset.name}</h2>
      <dl className="mt-4 grid gap-3 text-sm text-slate-600">
        <div className="flex justify-between">
          <dt className="font-medium text-slate-500">Category</dt>
          <dd>{asset.category}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-slate-500">Location</dt>
          <dd>{asset.locationPath.join(" → ")}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-slate-500">Last flush</dt>
          <dd>{new Date(asset.lastFlush).toLocaleString()}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium text-slate-500">Status</dt>
          <dd className={asset.overdue ? "text-rose-600" : "text-emerald-600"}>
            {asset.overdue ? "Overdue" : "On track"}
          </dd>
        </div>
      </dl>
    </div>
  );
}
