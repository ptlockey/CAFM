export default function RagBadge({ value }: { value: 'GREEN'|'AMBER'|'RED' }) {
  const map = {
    GREEN: 'bg-green-600/15 text-green-600 border-green-600/40',
    AMBER: 'bg-amber-500/15 text-amber-600 border-amber-600/40',
    RED:   'bg-red-600/15 text-red-600 border-red-600/40',
  } as const;
  return <span className={'inline-block rounded-full border px-2 py-0.5 text-xs font-medium ' + map[value]}>{value}</span>;
}
