import { DashboardAlert } from "@/lib/types";

interface AlertListProps {
  alerts: DashboardAlert[];
}

const severityStyles: Record<DashboardAlert["severity"], string> = {
  high: "border-rose-200 bg-rose-50 text-rose-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  low: "border-slate-200 bg-slate-50 text-slate-600",
};

const severityLabels: Record<DashboardAlert["severity"], string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function AlertList({ alerts }: AlertListProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">Live alerts</h3>
      <p className="text-sm text-slate-500">Automated monitoring insights from sensors and sampling rounds.</p>
      <ul className="mt-4 space-y-3">
        {alerts.map((alert) => (
          <li key={alert.id} className={`rounded-lg border px-4 py-3 ${severityStyles[alert.severity]}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">{alert.message}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{alert.detectedAt}</p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                {severityLabels[alert.severity]} priority
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
