import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { App } from "@/App";
import { AuthProvider } from "@/hooks";

describe("App Component", () => {
  it("should be rendered", () => {
    const { getByText } = render(<AuthProvider><App /></AuthProvider>);
    expect(getByText("Entrar")).toBeDefined();
  });
});
