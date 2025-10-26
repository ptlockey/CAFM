import { ManagerSiteStatus, RagStatus } from "@/lib/types";

interface SiteStatusTableProps {
  sites: ManagerSiteStatus[];
}

const statusStyles: Record<RagStatus, string> = {
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-rose-100 text-rose-700",
};

const statusLabels: Record<RagStatus, string> = {
  green: "On track",
  amber: "Attention",
  red: "At risk",
};

export function SiteStatusTable({ sites }: SiteStatusTableProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Site health (RAG)</h3>
          <p className="text-sm text-slate-500">Prioritized by overall risk profile across the estate.</p>
        </div>
        <div className="hidden text-xs font-medium uppercase tracking-wide text-slate-500 md:flex md:items-center md:gap-3">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Green
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-400" /> Amber
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-500" /> Red
          </span>
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead>
            <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th scope="col" className="px-4 py-3">Site</th>
              <th scope="col" className="px-4 py-3">Compliance</th>
              <th scope="col" className="px-4 py-3">Open work orders</th>
              <th scope="col" className="px-4 py-3">Critical findings</th>
              <th scope="col" className="px-4 py-3">Last audit</th>
              <th scope="col" className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sites.map((site) => (
              <tr key={site.siteId} className="hover:bg-slate-50">
                <td className="px-4 py-4 font-medium text-slate-800">{site.siteName}</td>
                <td className="px-4 py-4 text-slate-700">{site.compliance}%</td>
                <td className="px-4 py-4 text-slate-700">{site.openWorkOrders}</td>
                <td className="px-4 py-4 text-slate-700">{site.criticalFindings}</td>
                <td className="px-4 py-4 text-slate-700">{site.lastAudit}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[site.status]}`}>
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {statusLabels[site.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
