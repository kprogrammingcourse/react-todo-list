import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useLocalStorage from "../hooks/useLocalStorage.js";

describe("useLocalStorage", () => {
  it("returns the initial value when nothing is stored", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "hello"));

    expect(result.current[0]).toBe("hello");
  });

  it("reads a value that was already stored", () => {
    localStorage.setItem("test-key", JSON.stringify("saved value"));

    const { result } = renderHook(() => useLocalStorage("test-key", "hello"));

    expect(result.current[0]).toBe("saved value");
  });

  it("saves updated values to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", 0));

    act(() => {
      result.current[1](5);
    });

    expect(result.current[0]).toBe(5);
    expect(JSON.parse(localStorage.getItem("test-key"))).toBe(5);
  });

  it("falls back to the initial value when stored data is not valid JSON", () => {
    localStorage.setItem("test-key", "{this is not valid json");

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "fallback"),
    );

    expect(result.current[0]).toBe("fallback");
  });
});
