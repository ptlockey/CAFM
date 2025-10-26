import KpiCard from './components/KpiCard';
import AssetTable from './components/AssetTable';
import { MOCK_ASSETS, kpis } from './lib/data';

export default function Page() {
  const k = kpis(MOCK_ASSETS);
  return (
    <main className='mx-auto max-w-6xl space-y-6 p-6'>
      <header className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Facilities Compliance — Tap &amp; Shower Flushing</h1>
        <button className='rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/15'
          onClick={()=>alert('Export coming soon')}>
          Export evidence
        </button>
      </header>
      <section className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        <KpiCard title='Compliance' value={`${k.compliancePct}%`} sub={`${k.greens}/${k.total} green`} />
        <KpiCard title='Amber (due soon)' value={k.ambers} />
        <KpiCard title='Red (overdue/risk)' value={k.reds} />
        <KpiCard title='Total assets' value={k.total} />
      </section>
      <section className='space-y-3'>
        <div className='text-sm text-white/70'>Assets</div>
        <AssetTable assets={MOCK_ASSETS} />
      </section>
    </main>
  );
}
