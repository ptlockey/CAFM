"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import clsx from "clsx";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types";

const navigation: Array<{ href: string; label: string; roles: UserRole[] }> = [
  { href: "/manager", label: "Manager Dashboard", roles: ["manager"] },
  { href: "/sites/central-hospital", label: "Supervisor View", roles: ["supervisor", "manager"] },
  { href: "/scan", label: "Technician Scan", roles: ["technician", "manager"] },
];

interface RoleLayoutProps {
  children: ReactNode;
}

export function RoleLayout({ children }: RoleLayoutProps) {
  const pathname = usePathname();
  const { user, setRole } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">FM Portal</p>
            <p className="text-xl font-bold text-slate-900">Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-slate-600" htmlFor="role-switcher">
              Active role
            </label>
            <select
              id="role-switcher"
              className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm"
              value={user.role}
              onChange={(event) => setRole(event.target.value as UserRole)}
            >
              <option value="manager">Manager</option>
              <option value="supervisor">Supervisor</option>
              <option value="technician">Technician</option>
            </select>
          </div>
        </div>
        <nav className="border-t border-slate-200 bg-slate-100">
          <ul className="mx-auto flex w-full max-w-6xl items-center gap-4 px-6 py-2 text-sm font-medium text-slate-600">
            {navigation
              .filter((item) => item.roles.includes(user.role))
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "rounded-md px-3 py-2 transition",
                      pathname === item.href
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-white hover:text-slate-900",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-8">{children}</main>
    </div>
  );
}
