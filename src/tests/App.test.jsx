import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../App.jsx";

describe("App", () => {
  it("shows the sample tasks on the first visit", () => {
    render(<App />);

    expect(screen.getByText("Build a to-do list")).toBeInTheDocument();
    expect(screen.getByText("1 task left")).toBeInTheDocument();
  });

  it("shows the number of tasks left in the browser tab title", () => {
    render(<App />);

    expect(document.title).toBe("(1) To-Do List");
  });

  it("adds a new task", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("New task"), "Write tests");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText("2 tasks left")).toBeInTheDocument();
    expect(screen.getByLabelText("New task")).toHaveValue("");
  });

  it("shows an error when adding an empty task", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Please enter a task.");
  });

  it("marks a task as completed", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByLabelText("Build a to-do list"));

    expect(screen.getByLabelText("Build a to-do list")).toBeChecked();
    expect(screen.getByText("0 tasks left")).toBeInTheDocument();
  });

  it("deletes a task", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole("button", { name: 'Delete "Learn useState"' }),
    );

    expect(screen.queryByText("Learn useState")).not.toBeInTheDocument();
  });

  it("shows only unfinished tasks when the Active filter is selected", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Active" }));

    expect(screen.getByText("Build a to-do list")).toBeInTheDocument();
    expect(screen.queryByText("Learn useState")).not.toBeInTheDocument();
  });

  it("keeps tasks after the app is closed and opened again", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.type(screen.getByLabelText("New task"), "Remember me");
    await user.click(screen.getByRole("button", { name: "Add" }));
    unmount();

    render(<App />);

    expect(screen.getByText("Remember me")).toBeInTheDocument();
  });
});
