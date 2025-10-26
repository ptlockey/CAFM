"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { useManagerDashboard } from "@/hooks/useManagerDashboard";

export default function ManagerDashboardPage() {
  const { data, isLoading, isError } = useManagerDashboard();

  return (
    <AuthGuard allowed={["manager"]}>
      <div className="grid gap-6">
        <h1 className="text-2xl font-bold text-slate-900">Compliance overview</h1>
        {isLoading ? <p className="text-sm text-slate-500">Loading metrics…</p> : null}
        {isError ? (
          <p className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            We were unable to load the latest metrics. Please try again.
          </p>
        ) : null}
        {data ? (
          <>
            <section className="grid gap-4 md:grid-cols-3">
              <DashboardCard
                label="Compliance"
                value={`${data.compliancePercentage}%`}
                description="Assets flushed in the last 30 days"
                accent="green"
              />
              <DashboardCard
                label="Overdue tasks"
                value={data.overdueTasks}
                description="Jobs requiring urgent follow-up"
                accent="amber"
              />
              <DashboardCard
                label="High-risk sites"
                value={data.highRiskSites}
                description="Sites exceeding temperature thresholds"
                accent="red"
              />
            </section>
            <section>
              <TrendChart points={data.trend} />
            </section>
          </>
        ) : null}
      </div>
    </AuthGuard>
  );
}
