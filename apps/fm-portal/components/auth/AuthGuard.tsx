"use client";

import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types";

interface AuthGuardProps {
  allowed: UserRole[];
  fallback?: ReactNode;
  children: ReactNode;
}

export function AuthGuard({ allowed, fallback, children }: AuthGuardProps) {
  const { user } = useAuth();

  if (!allowed.includes(user.role)) {
    return (
      fallback ?? (
        <div className="rounded-md border border-dashed border-red-400 bg-red-50 p-6 text-red-600">
          You do not have access to this section.
        </div>
      )
    );
  }

  return <>{children}</>;
}
