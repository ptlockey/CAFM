import { ReactNode } from "react";

interface DashboardCardProps {
  label: string;
  value: ReactNode;
  description?: string;
  accent?: "green" | "amber" | "red";
}

const accentStyles: Record<NonNullable<DashboardCardProps["accent"]>, string> = {
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  red: "border-rose-200 bg-rose-50 text-rose-700",
};

export function DashboardCard({ label, value, description, accent = "green" }: DashboardCardProps) {
  return (
    <div className={`rounded-xl border px-6 py-5 shadow-sm ${accentStyles[accent]}`}>
      <p className="text-sm font-medium uppercase tracking-wide text-slate-600">{label}</p>
      <div className="mt-2 text-3xl font-bold">{value}</div>
      {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
    </div>
  );
}
