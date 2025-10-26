import { TrendPoint } from "@/lib/types";

interface TrendChartProps {
  points: TrendPoint[];
}

export function TrendChart({ points }: TrendChartProps) {
  if (!points.length) {
    return <p className="text-sm text-slate-500">No trend data available.</p>;
  }

  const maxValue = Math.max(...points.map((point) => point.compliance));
  const minValue = Math.min(...points.map((point) => point.compliance));
  const padding = 10;
  const width = 400;
  const height = 200;
  const step = width / Math.max(points.length - 1, 1);

  const normalize = (value: number) => {
    if (maxValue === minValue) {
      return height / 2;
    }
    return (
      height - padding - ((value - minValue) / (maxValue - minValue)) * (height - padding * 2)
    );
  };

  const path = points
    .map((point, index) => {
      const x = index * step;
      const y = normalize(point.compliance);
      return `${index === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">Compliance Trend</h3>
      <svg viewBox={`0 0 ${width} ${height}`} className="mt-4 h-48 w-full">
        <path d={`${path}`} fill="none" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
        {points.map((point, index) => (
          <g key={point.month}>
            <circle cx={index * step} cy={normalize(point.compliance)} r={5} fill="#22c55e" />
            <text x={index * step} y={height - 4} textAnchor="middle" className="fill-slate-500 text-xs">
              {point.month}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
