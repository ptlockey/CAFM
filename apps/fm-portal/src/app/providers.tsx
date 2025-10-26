"use client";

import { PropsWithChildren, useEffect } from "react";
import { QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/contexts/AuthContext";
import { createQueryClient } from "@/lib/queryClient";
import { initMocks } from "@/lib/initMocks";
import { ServiceWorkerProvider } from "@/components/offline/ServiceWorkerProvider";

const queryClient = createQueryClient();

export function Providers({ children }: PropsWithChildren) {
  useEffect(() => {
    initMocks();
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary>{children}</HydrationBoundary>
        <ServiceWorkerProvider />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </AuthProvider>
  );
}
