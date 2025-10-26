import { http, HttpResponse } from "msw";
import { z } from "zod";

type AssetRisk = "low" | "medium" | "high";

type Asset = {
  id: string;
  name: string;
  category: string;
  locationPath: string[];
  siteId: string;
  lastFlush: string;
  risk: AssetRisk;
  overdue: boolean;
};

type Site = {
  id: string;
  name: string;
  buildings: Array<{
    id: string;
    name: string;
    locations: Array<{
      id: string;
      name: string;
    }>;
  }>;
};

const sites: Site[] = [
  {
    id: "central-hospital",
    name: "Central Hospital",
    buildings: [
      {
        id: "ward-a",
        name: "Ward A",
        locations: [
          { id: "ward-a-floor-1", name: "Floor 1" },
          { id: "ward-a-floor-2", name: "Floor 2" },
        ],
      },
      {
        id: "ward-b",
        name: "Ward B",
        locations: [
          { id: "ward-b-floor-1", name: "Floor 1" },
          { id: "ward-b-floor-2", name: "Floor 2" },
        ],
      },
    ],
  },
  {
    id: "lakeside-care",
    name: "Lakeside Care Home",
    buildings: [
      {
        id: "lodge",
        name: "Lodge",
        locations: [
          { id: "lodge-wing-a", name: "Wing A" },
          { id: "lodge-wing-b", name: "Wing B" },
        ],
      },
    ],
  },
];

const assets: Asset[] = [
  {
    id: "asset-1",
    name: "Thermostatic Mixing Valve 1",
    category: "TMV",
    locationPath: ["Central Hospital", "Ward A", "Floor 1"],
    siteId: "central-hospital",
    lastFlush: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    risk: "medium",
    overdue: false,
  },
  {
    id: "asset-2",
    name: "Thermostatic Mixing Valve 2",
    category: "TMV",
    locationPath: ["Central Hospital", "Ward A", "Floor 2"],
    siteId: "central-hospital",
    lastFlush: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
    risk: "high",
    overdue: true,
  },
  {
    id: "asset-3",
    name: "Cold Water Outlet 1",
    category: "Outlet",
    locationPath: ["Lakeside Care Home", "Lodge", "Wing B"],
    siteId: "lakeside-care",
    lastFlush: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
    risk: "low",
    overdue: false,
  },
];

const managerMetrics = {
  compliancePercentage: 87,
  overdueTasks: 12,
  highRiskSites: 3,
  trend: [
    { month: "Jan", compliance: 78 },
    { month: "Feb", compliance: 81 },
    { month: "Mar", compliance: 84 },
    { month: "Apr", compliance: 87 },
  ],
};

const flushSchema = z.object({
  assetId: z.string(),
  time: z.string(),
  temperature: z.number(),
  duration: z.number(),
  note: z.string().optional(),
});

const handlers = [
  http.get("/api/manager/metrics", () => {
    return HttpResponse.json(managerMetrics);
  }),
  http.get("/api/sites", () => {
    return HttpResponse.json({ sites });
  }),
  http.get("/api/sites/:siteId", ({ params }) => {
    const site = sites.find((item) => item.id === params.siteId);
    if (!site) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    return HttpResponse.json({ site });
  }),
  http.get("/api/sites/:siteId/assets", ({ params, request }) => {
    const url = new URL(request.url);
    const riskFilter = url.searchParams.get("risk");
    const query = url.searchParams.get("q")?.toLowerCase();

    const filtered = assets.filter((asset) => {
      const matchesSite = asset.siteId === params.siteId;
      const matchesRisk = riskFilter ? asset.risk === riskFilter : true;
      const matchesQuery = query ? asset.name.toLowerCase().includes(query) : true;
      return matchesSite && matchesRisk && matchesQuery;
    });

    return HttpResponse.json({ assets: filtered });
  }),
  http.get("/api/assets/:assetId", ({ params }) => {
    const asset = assets.find((item) => item.id === params.assetId);
    if (!asset) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    return HttpResponse.json({ asset });
  }),
  http.post("/api/assets/:assetId/flush", async ({ request, params }) => {
    const data = await request.json();
    const parseResult = flushSchema.safeParse({ ...data, assetId: params.assetId });
    if (!parseResult.success) {
      return HttpResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const assetIndex = assets.findIndex((item) => item.id === params.assetId);
    if (assetIndex >= 0) {
      assets[assetIndex] = {
        ...assets[assetIndex],
        lastFlush: parseResult.data.time,
        overdue: false,
      };
    }

    return HttpResponse.json({ status: "ok" });
  }),
];

export { handlers };
