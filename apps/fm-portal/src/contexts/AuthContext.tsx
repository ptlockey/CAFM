"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { User, UserRole } from "@/lib/types";

interface AuthContextValue {
  user: User;
  setRole: (role: UserRole) => void;
}

const defaultUser: User = {
  id: "demo-user",
  name: "Demo User",
  role: "manager",
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  initialRole?: UserRole;
}

export function AuthProvider({ children, initialRole }: AuthProviderProps) {
  const [user, setUser] = useState<User>({ ...defaultUser, role: initialRole ?? defaultUser.role });

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      setRole: (role) => setUser((current) => ({ ...current, role })),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
