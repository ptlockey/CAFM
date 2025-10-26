"use client";

import { useMemo } from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { useManagerDashboard } from "@/hooks/useManagerDashboard";
import { AlertList } from "@/components/dashboard/AlertList";
import { UpcomingWorkList } from "@/components/dashboard/UpcomingWorkList";
import { SiteStatusTable } from "@/components/dashboard/SiteStatusTable";

export default function ManagerDashboardPage() {
  const { data, isLoading, isError } = useManagerDashboard();
  const reportingDate = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(new Date()),
    [],
  );

  return (
    <AuthGuard allowed={["manager"]}>
      <div className="grid gap-6">
        <header className="flex flex-col gap-2 border-b border-slate-200 pb-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Facilities command center
          </p>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Water safety performance</h1>
              <p className="text-sm text-slate-600">Consolidated status across all healthcare sites.</p>
            </div>
            <p className="text-sm font-medium text-slate-500">Report generated {reportingDate}</p>
          </div>
        </header>
        {isLoading ? <p className="text-sm text-slate-500">Loading metrics…</p> : null}
        {isError ? (
          <p className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            We were unable to load the latest metrics. Please try again.
          </p>
        ) : null}
        {data ? (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <DashboardCard
                label="Compliance"
                value={`${data.compliancePercentage}%`}
                description="Assets flushed in the last 30 days"
                accent="green"
                change={`${data.complianceChange > 0 ? "+" : ""}${data.complianceChange}% vs last month`}
                changeTone={data.complianceChange >= 0 ? "positive" : "negative"}
              />
              <DashboardCard
                label="Overdue tasks"
                value={data.overdueTasks}
                description="Jobs requiring urgent follow-up"
                accent={data.overdueTasks > 5 ? "amber" : "green"}
                change={`${data.overdueChange > 0 ? "+" : ""}${data.overdueChange} vs last month`}
                changeTone={data.overdueChange <= 0 ? "positive" : "negative"}
              />
              <DashboardCard
                label="High-risk sites"
                value={data.highRiskSites}
                description="Sites exceeding temperature thresholds"
                accent="red"
                change={`${data.highRiskChange > 0 ? "+" : ""}${data.highRiskChange} vs last month`}
                changeTone={data.highRiskChange <= 0 ? "positive" : "negative"}
              />
              <DashboardCard
                label="Avg. response time"
                value={`${data.averageResolutionTime} hrs`}
                description="Time to remediate critical findings"
                accent="amber"
                change={`${data.averageResolutionChange > 0 ? "+" : ""}${data.averageResolutionChange} hrs vs last month`}
                changeTone={data.averageResolutionChange <= 0 ? "positive" : "negative"}
              />
            </section>
            <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
              <TrendChart points={data.trend} />
              <div className="grid gap-6">
                <AlertList alerts={data.alerts} />
                <UpcomingWorkList items={data.upcomingWork} />
              </div>
            </section>
            <SiteStatusTable sites={data.siteStatuses} />
          </>
        ) : null}
      </div>
    </AuthGuard>
  );
}
