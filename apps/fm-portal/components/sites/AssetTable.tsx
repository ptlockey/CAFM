import { ChangeEvent } from "react";
import { AssetSummary } from "@/lib/types";

interface AssetTableProps {
  assets: AssetSummary[];
  riskFilter: string;
  searchTerm: string;
  onRiskChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

const riskStyles: Record<AssetSummary["risk"], string> = {
  low: "bg-emerald-100 text-emerald-800",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-rose-100 text-rose-800",
};

export function AssetTable({ assets, riskFilter, searchTerm, onRiskChange, onSearchChange }: AssetTableProps) {
  const handleRiskChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onRiskChange(event.target.value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-800">Assets</h2>
        <div className="ml-auto flex items-center gap-3 text-sm">
          <label className="text-slate-600" htmlFor="risk-filter">
            Risk
          </label>
          <select
            id="risk-filter"
            className="rounded-md border border-slate-200 bg-white px-2 py-1"
            value={riskFilter}
            onChange={handleRiskChange}
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <label className="text-slate-600" htmlFor="asset-search">
            Search
          </label>
          <input
            id="asset-search"
            type="search"
            className="w-48 rounded-md border border-slate-200 px-2 py-1"
            placeholder="Asset name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-6 py-3">Asset</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Last flush</th>
              <th className="px-6 py-3">Risk</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {assets.map((asset) => (
              <tr key={asset.id} className="hover:bg-slate-50">
                <td className="px-6 py-3 font-medium text-slate-800">{asset.name}</td>
                <td className="px-6 py-3 text-slate-600">{asset.locationPath.join(" → ")}</td>
                <td className="px-6 py-3 text-slate-600">
                  {new Date(asset.lastFlush).toLocaleString()}
                </td>
                <td className="px-6 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${riskStyles[asset.risk]}`}>
                    {asset.risk.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-3 text-slate-600">
                  {asset.overdue ? (
                    <span className="text-rose-600">Overdue</span>
                  ) : (
                    <span className="text-emerald-600">On track</span>
                  )}
                </td>
              </tr>
            ))}
            {!assets.length ? (
              <tr>
                <td colSpan={5} className="px-6 py-6 text-center text-slate-500">
                  No assets match the current filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
