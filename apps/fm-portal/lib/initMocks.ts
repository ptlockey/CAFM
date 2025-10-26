"use client";

let initialized = false;

export async function initMocks() {
  if (initialized || typeof window === "undefined") {
    return;
  }

  if (process.env.NEXT_PUBLIC_API_MOCKING === "disabled") {
    return;
  }

  const { worker } = await import("@/mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
  initialized = true;
}
