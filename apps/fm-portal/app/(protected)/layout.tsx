import { ReactNode } from "react";
import { RoleLayout } from "@/components/layout/RoleLayout";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <RoleLayout>{children}</RoleLayout>;
}
