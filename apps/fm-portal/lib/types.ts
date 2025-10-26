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

export interface ManagerMetrics {
  compliancePercentage: number;
  overdueTasks: number;
  highRiskSites: number;
  trend: TrendPoint[];
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
