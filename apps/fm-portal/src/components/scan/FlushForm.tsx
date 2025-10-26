import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useRecordFlush } from "@/hooks/useRecordFlush";
import { FlushFormValues } from "@/lib/types";

interface FlushFormProps {
  assetId: string;
  siteId: string;
}

const nowInputValue = () => {
  const now = new Date();
  now.setMilliseconds(0);
  return now.toISOString().slice(0, 16);
};

export function FlushForm({ assetId, siteId }: FlushFormProps) {
  const createDefaults = useCallback(
    () => ({
      time: nowInputValue(),
      temperature: 55,
      duration: 2,
      note: "",
      photo: null as File | null,
    }),
    [],
  );

  const [formState, setFormState] = useState(createDefaults);
  const mutation = useRecordFlush();

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: name === "temperature" || name === "duration" ? Number(value) : value,
    }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFormState((current) => ({ ...current, photo: file }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: FlushFormValues = {
      assetId,
      siteId,
      time: new Date(formState.time).toISOString(),
      temperature: formState.temperature,
      duration: formState.duration,
      note: formState.note || undefined,
      photo: formState.photo,
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        setFormState(createDefaults());
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Record flush</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Time completed
          <input
            type="datetime-local"
            name="time"
            value={formState.time}
            onChange={handleChange}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Outlet temperature (°C)
          <input
            type="number"
            name="temperature"
            value={formState.temperature}
            onChange={handleChange}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm"
            required
            min={0}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Flush duration (minutes)
          <input
            type="number"
            name="duration"
            value={formState.duration}
            onChange={handleChange}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm"
            required
            min={0}
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Notes
          <textarea
            name="note"
            value={formState.note}
            onChange={handleChange}
            className="h-24 rounded-md border border-slate-200 px-3 py-2 text-sm"
            placeholder="Temperature trends, remedial action, etc."
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
          Photo evidence
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Saving…" : "Save record"}
        </button>
        {mutation.isError ? (
          <span className="text-sm text-rose-600">We couldn't save your flush record.</span>
        ) : null}
        {mutation.isSuccess ? (
          <span className="text-sm text-emerald-600">Flush saved offline and synced.</span>
        ) : null}
      </div>
    </form>
  );
}
