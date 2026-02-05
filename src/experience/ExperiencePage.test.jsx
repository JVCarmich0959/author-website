import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("./components/ExperienceScene", () => ({
  default: () => <div data-testid="experience-scene" />,
}));

import ExperiencePage from "./ExperiencePage.jsx";

describe("ExperiencePage", () => {
  it("renders overlay navigation with six chapters", async () => {
    render(<ExperiencePage />);
    fireEvent.click(screen.getByRole("button", { name: /enter experience/i }));
    await screen.findByTestId("experience-scene");
    const buttons = screen.getAllByRole("button", { name: /Jump to chapter/i });
    expect(buttons).toHaveLength(6);
  });
});
