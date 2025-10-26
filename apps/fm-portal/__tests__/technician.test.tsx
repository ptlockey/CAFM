import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TechnicianScanPage from "@/app/(protected)/scan/page";
import { renderWithProviders } from "@/test/test-utils";

describe("Technician scan flow", () => {
  it("loads asset details and records a flush", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TechnicianScanPage />, { role: "technician" });

    await user.clear(screen.getByLabelText("Scan QR code"));
    await user.type(screen.getByLabelText("Scan QR code"), "asset-2");
    await user.click(screen.getByRole("button", { name: /Load asset/i }));

    await waitFor(() => expect(screen.getByText("Thermostatic Mixing Valve 2")).toBeInTheDocument());

    await user.type(screen.getByLabelText(/Notes/), "Hot water flush recorded");
    await user.click(screen.getByRole("button", { name: /Save record/i }));

    await waitFor(() => expect(screen.getByText(/Flush saved offline/)).toBeInTheDocument());
  });
});
