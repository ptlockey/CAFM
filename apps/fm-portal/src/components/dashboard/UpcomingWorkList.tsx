import { UpcomingWorkItem } from "@/lib/types";

interface UpcomingWorkListProps {
  items: UpcomingWorkItem[];
}

export function UpcomingWorkList({ items }: UpcomingWorkListProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">Scheduled work</h3>
      <p className="text-sm text-slate-500">Next seven days of planned activity across teams.</p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-slate-800">{item.title}</p>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="font-medium uppercase tracking-wide text-slate-600">{item.siteName}</span>
              <span>{item.scheduledFor}</span>
              <span>Lead: {item.assignedTo}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
