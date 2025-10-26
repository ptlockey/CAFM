import { FormEvent, useState } from "react";

interface ScanInputProps {
  onScan: (assetId: string) => void;
}

export function ScanInput({ onScan }: ScanInputProps) {
  const [value, setValue] = useState("asset-1");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value.trim()) {
      return;
    }
    onScan(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3">
      <label className="text-sm font-medium text-slate-600" htmlFor="qr-value">
        Scan QR code
      </label>
      <input
        id="qr-value"
        className="w-48 rounded-md border border-slate-200 px-3 py-2 text-sm"
        placeholder="Asset ID"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button
        type="submit"
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
      >
        Load asset
      </button>
    </form>
  );
}
