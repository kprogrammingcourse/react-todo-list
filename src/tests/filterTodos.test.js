import { describe, expect, it } from "vitest";
import { filterTodos } from "../utils/filterTodos.js";

const todos = [
  { id: "1", text: "Active task", completed: false },
  { id: "2", text: "Done task", completed: true },
];

describe("filterTodos", () => {
  it("returns every task for the 'all' filter", () => {
    expect(filterTodos(todos, "all")).toEqual(todos);
  });

  it("returns only unfinished tasks for the 'active' filter", () => {
    expect(filterTodos(todos, "active")).toEqual([todos[0]]);
  });

  it("returns only finished tasks for the 'completed' filter", () => {
    expect(filterTodos(todos, "completed")).toEqual([todos[1]]);
  });

  it("returns every task for an unknown filter", () => {
    expect(filterTodos(todos, "something-else")).toEqual(todos);
  });
});
