import Link from "next/link";

const quickLinks = [
  {
    href: "/manager",
    title: "Manager dashboard",
    description: "Track compliance, overdue work, and critical alerts across the estate.",
  },
  {
    href: "/sites/central-hospital",
    title: "Supervisor view",
    description: "Drill into a specific hospital to review building status and open jobs.",
  },
  {
    href: "/scan",
    title: "Technician scan",
    description: "Record flushing activity and temperature checks while on-site.",
  },
];

const featureHighlights = [
  {
    title: "Operational visibility",
    copy:
      "Real-time dashboards bring together compliance, risk, and workload data so every role has a shared picture of performance.",
  },
  {
    title: "Role-based workflows",
    copy:
      "Switch between manager, supervisor, and technician perspectives to understand what matters most for each team member.",
  },
  {
    title: "Offline ready",
    copy:
      "Capture site activities even in low-connectivity environments—changes sync automatically when you're back online.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_55%)]" aria-hidden="true" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">Facilities management</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              Keep water safety programmes on track across every site
            </h1>
            <p className="mt-6 text-lg text-emerald-50">
              The CAFM portal gives managers, supervisors, and technicians a shared workspace to monitor compliance,
              prioritise alerts, and evidence remedial actions in seconds.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/manager"
              className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
            >
              Enter dashboard
            </Link>
            <Link
              href="/scan"
              className="inline-flex items-center justify-center rounded-md border border-white/60 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Open technician tools
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featureHighlights.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50"
            >
              <h2 className="text-lg font-semibold text-slate-900">{feature.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-slate-900">Choose where to start</h2>
            <p className="mt-2 text-sm text-slate-600">
              Jump straight into the workspace that matches your role. Demo data is included so you can explore the
              experience end-to-end.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50 p-6 transition hover:border-emerald-400 hover:bg-white"
              >
                <span className="text-sm font-semibold uppercase tracking-wide text-emerald-600">{link.title}</span>
                <p className="mt-3 flex-1 text-sm text-slate-600">{link.description}</p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-emerald-700">
                  Launch workspace
                  <span className="ml-2 inline-block transform transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
