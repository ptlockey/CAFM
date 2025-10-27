import { MOCK_ASSETS,kpis } from "./lib/data";
import AssetTable from "./components/AssetTable";

export default function Page(){
  const k=kpis(MOCK_ASSETS);
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Facilities Compliance — Tap &amp; Shower Flushing</h1>
        <button className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
          onClick={()=>alert("Export coming soon")}>Export evidence</button>
      </header>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm">
          <div className="text-sm text-white/70">Compliance</div>
          <div className="mt-1 text-3xl font-semibold">{k.compliancePct}%</div>
          <div className="mt-1 text-xs text-white/60">{k.greensCount}/{k.total} green</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm">
          <div className="text-sm text-white/70">Amber (due soon)</div>
          <div className="mt-1 text-3xl font-semibold">{k.ambers}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm">
          <div className="text-sm text-white/70">Red (overdue/risk)</div>
          <div className="mt-1 text-3xl font-semibold">{k.reds}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm">
          <div className="text-sm text-white/70">Total assets</div>
          <div className="mt-1 text-3xl font-semibold">{k.total}</div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="text-sm text-white/70">Assets</div>
        <AssetTable assets={MOCK_ASSETS}/>
      </section>
    </main>
  );
}
