type Props = { title: string; value: string|number; sub?: string; };
export default function KpiCard({ title, value, sub }: Props) {
  return (
    <div className='rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm'>
      <div className='text-sm text-white/70'>{title}</div>
      <div className='mt-1 text-3xl font-semibold'>{value}</div>
      {sub && <div className='mt-1 text-xs text-white/60'>{sub}</div>}
    </div>
  );
}
