import { SiteSummary } from "@/lib/types";

interface SiteTreeProps {
  site: SiteSummary;
}

export function SiteTree({ site }: SiteTreeProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Site structure</h2>
      <ul className="mt-4 space-y-3 text-sm text-slate-700">
        {site.buildings.map((building) => (
          <li key={building.id}>
            <details className="rounded-lg border border-slate-100 bg-slate-50 p-3" open>
              <summary className="cursor-pointer font-semibold text-slate-800">{building.name}</summary>
              <ul className="mt-2 space-y-1 border-l border-slate-200 pl-4">
                {building.locations.map((location) => (
                  <li key={location.id} className="text-slate-600">
                    {location.name}
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
