'use client';
import RagBadge from './RagBadge';
import { Asset, getRag } from '../lib/data';
import { useMemo, useState } from 'react';
export default function AssetTable({ assets }: { assets: Asset[] }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return assets.filter(a => [a.site,a.building,a.location,a.id].some(s => s.toLowerCase().includes(q)));
  }, [assets, query]);
  return (
    <div className='rounded-2xl border border-white/10 bg-white/5'>
      <div className='p-3'>
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder='Search site, building, location…'
          className='w-full rounded-lg border border-white/10 bg-black/30 p-2 text-sm outline-none'/>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full text-sm'>
          <thead className='text-left text-white/60'>
            <tr><th className='px-4 py-2'>Asset</th><th className='px-4 py-2'>Site / Building</th>
                <th className='px-4 py-2'>Location</th><th className='px-4 py-2'>Last Flush</th>
                <th className='px-4 py-2'>Temp °C</th><th className='px-4 py-2'>RAG</th></tr>
          </thead>
          <tbody>
            {filtered.map(a=>{
              const rag = getRag(a);
              return (
                <tr key={a.id} className='border-t border-white/10'>
                  <td className='px-4 py-2'>{a.kind.toUpperCase()} • {a.id}</td>
                  <td className='px-4 py-2'>{a.site} / {a.building}</td>
                  <td className='px-4 py-2'>{a.location}</td>
                  <td className='px-4 py-2'>{new Date(a.lastFlushedAt).toLocaleDateString()}</td>
                  <td className='px-4 py-2'>{a.tempC ?? '—'}</td>
                  <td className='px-4 py-2'><RagBadge value={rag} /></td>
                </tr>);
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
