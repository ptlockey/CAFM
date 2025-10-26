import { ReactNode } from "react";

interface DashboardCardProps {
  label: string;
  value: ReactNode;
  description?: string;
  accent?: "green" | "amber" | "red";
  change?: string;
  changeTone?: "positive" | "negative" | "neutral";
}

const accentStyles: Record<NonNullable<DashboardCardProps["accent"]>, string> = {
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  red: "border-rose-200 bg-rose-50 text-rose-700",
};

const changeToneStyles: Record<NonNullable<DashboardCardProps["changeTone"]>, string> = {
  positive: "text-emerald-700",
  negative: "text-rose-700",
  neutral: "text-slate-600",
};

export function DashboardCard({
  label,
  value,
  description,
  accent = "green",
  change,
  changeTone = "neutral",
}: DashboardCardProps) {
  return (
    <div className={`rounded-xl border px-6 py-5 shadow-sm ${accentStyles[accent]}`}>
      <p className="text-sm font-medium uppercase tracking-wide text-slate-600">{label}</p>
      <div className="mt-2 text-3xl font-bold">{value}</div>
      {change ? (
        <p className={`mt-1 text-sm font-medium ${changeToneStyles[changeTone]}`}>{change}</p>
      ) : null}
      {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
    </div>
  );
}
