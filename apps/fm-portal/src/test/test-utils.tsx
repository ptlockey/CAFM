import { ReactElement, useState } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types";

type ExtendedRenderOptions = {
  role?: UserRole;
} & Omit<RenderOptions, "wrapper">;

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

function TestProviders({ children, role }: { children: ReactElement; role?: UserRole }) {
  const [client] = useState(createTestQueryClient);
  return (
    <AuthProvider initialRole={role}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </AuthProvider>
  );
}

export function renderWithProviders(ui: ReactElement, options?: ExtendedRenderOptions) {
  const { role, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: ({ children }) => <TestProviders role={role}>{children}</TestProviders>,
    ...renderOptions,
  });
}
