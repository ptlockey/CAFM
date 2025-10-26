import { screen, waitFor } from "@testing-library/react";
import ManagerDashboardPage from "@/app/(protected)/manager/page";
import { renderWithProviders } from "@/test/test-utils";

describe("Manager dashboard", () => {
  it("renders summary cards and trend", async () => {
    renderWithProviders(<ManagerDashboardPage />, { role: "manager" });

    expect(screen.getByText(/Loading metrics/)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("87%")).toBeInTheDocument(), { timeout: 2000 });

    expect(screen.getByText("Overdue tasks")).toBeInTheDocument();
    expect(screen.getByText("High-risk sites")).toBeInTheDocument();
    expect(screen.getByText("Compliance Trend")).toBeInTheDocument();
  });
});
