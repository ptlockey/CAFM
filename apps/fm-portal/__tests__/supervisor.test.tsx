import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SiteSupervisorPage from "@/app/(protected)/sites/[id]/page";
import { renderWithProviders } from "@/test/test-utils";

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "central-hospital" }),
}));

describe("Supervisor site view", () => {
  it("filters assets by risk", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteSupervisorPage />, { role: "supervisor" });

    await waitFor(() => expect(screen.getByText("Thermostatic Mixing Valve 1")).toBeInTheDocument());

    const riskSelect = screen.getByLabelText("Risk");
    await user.selectOptions(riskSelect, "high");

    await waitFor(() => expect(screen.queryByText("Thermostatic Mixing Valve 1")).not.toBeInTheDocument());
    expect(screen.getByText("Thermostatic Mixing Valve 2")).toBeInTheDocument();
  });
});
