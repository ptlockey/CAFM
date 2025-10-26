export type UserRole = "manager" | "supervisor" | "technician";

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface TrendPoint {
  month: string;
  compliance: number;
}

export type RagStatus = "green" | "amber" | "red";

export interface ManagerSiteStatus {
  siteId: string;
  siteName: string;
  status: RagStatus;
  compliance: number;
  openWorkOrders: number;
  criticalFindings: number;
  lastAudit: string;
}

export interface DashboardAlert {
  id: string;
  message: string;
  severity: "low" | "medium" | "high";
  detectedAt: string;
}

export interface UpcomingWorkItem {
  id: string;
  title: string;
  siteName: string;
  scheduledFor: string;
  assignedTo: string;
}

export interface ManagerMetrics {
  compliancePercentage: number;
  complianceChange: number;
  overdueTasks: number;
  overdueChange: number;
  highRiskSites: number;
  highRiskChange: number;
  averageResolutionTime: number;
  averageResolutionChange: number;
  trend: TrendPoint[];
  siteStatuses: ManagerSiteStatus[];
  alerts: DashboardAlert[];
  upcomingWork: UpcomingWorkItem[];
}

export interface SiteLocation {
  id: string;
  name: string;
}

export interface SiteBuilding {
  id: string;
  name: string;
  locations: SiteLocation[];
}

export interface SiteSummary {
  id: string;
  name: string;
  buildings: SiteBuilding[];
}

export interface AssetSummary {
  id: string;
  name: string;
  category: string;
  locationPath: string[];
  siteId: string;
  lastFlush: string;
  risk: "low" | "medium" | "high";
  overdue: boolean;
}

export interface FlushFormValues {
  assetId: string;
  siteId: string;
  time: string;
  temperature: number;
  duration: number;
  note?: string;
  photo?: File | null;
}
