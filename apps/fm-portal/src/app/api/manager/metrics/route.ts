import { NextResponse } from "next/server";
import { ManagerMetrics } from "@/lib/types";

const metrics: ManagerMetrics = {
  compliancePercentage: 92,
  complianceChange: 4,
  overdueTasks: 8,
  overdueChange: -3,
  highRiskSites: 3,
  highRiskChange: -1,
  averageResolutionTime: 18,
  averageResolutionChange: -6,
  trend: [
    { month: "Nov", compliance: 82 },
    { month: "Dec", compliance: 85 },
    { month: "Jan", compliance: 87 },
    { month: "Feb", compliance: 90 },
    { month: "Mar", compliance: 91 },
    { month: "Apr", compliance: 92 },
  ],
  siteStatuses: [
    {
      siteId: "central-hospital",
      siteName: "Central Hospital",
      status: "amber",
      compliance: 88,
      openWorkOrders: 5,
      criticalFindings: 2,
      lastAudit: "4 days ago",
    },
    {
      siteId: "north-clinic",
      siteName: "North Clinic",
      status: "green",
      compliance: 95,
      openWorkOrders: 1,
      criticalFindings: 0,
      lastAudit: "Yesterday",
    },
    {
      siteId: "east-wing",
      siteName: "East Wing Pavilion",
      status: "amber",
      compliance: 89,
      openWorkOrders: 3,
      criticalFindings: 1,
      lastAudit: "6 days ago",
    },
    {
      siteId: "west-rehab",
      siteName: "West Rehab Center",
      status: "green",
      compliance: 96,
      openWorkOrders: 0,
      criticalFindings: 0,
      lastAudit: "2 days ago",
    },
    {
      siteId: "south-labs",
      siteName: "South Labs",
      status: "red",
      compliance: 74,
      openWorkOrders: 9,
      criticalFindings: 4,
      lastAudit: "15 days ago",
    },
  ],
  alerts: [
    {
      id: "alert-1",
      message: "Legionella positive sample detected in South Labs cooling tower",
      severity: "high",
      detectedAt: "35 minutes ago",
    },
    {
      id: "alert-2",
      message: "Temperature anomaly recorded at Central Hospital basement tap",
      severity: "medium",
      detectedAt: "2 hours ago",
    },
    {
      id: "alert-3",
      message: "Routine sample overdue at East Wing Pavilion",
      severity: "low",
      detectedAt: "1 day ago",
    },
  ],
  upcomingWork: [
    {
      id: "task-1",
      title: "Quarterly water safety audit",
      siteName: "Central Hospital",
      scheduledFor: "Tomorrow, 09:00",
      assignedTo: "Patricia Gomez",
    },
    {
      id: "task-2",
      title: "Flush validation walk-through",
      siteName: "South Labs",
      scheduledFor: "Friday, 13:30",
      assignedTo: "Jordan Blake",
    },
    {
      id: "task-3",
      title: "Emergency remediation review",
      siteName: "North Clinic",
      scheduledFor: "Monday, 08:15",
      assignedTo: "Xiao Chen",
    },
  ],
};

export async function GET() {
  return NextResponse.json(metrics);
}
