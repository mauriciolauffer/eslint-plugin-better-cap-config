import { describe, it, expect } from "vitest";
import plugin from "../src/index.js";

describe("eslint-plugin-better-cap-config", () => {
  it("should export plugin with correct structure", () => {
    expect(plugin).toBeTruthy();
    expect(plugin.meta).toBeTruthy();
    expect(plugin.rules).toBeTruthy();
    expect(plugin.configs).toBeTruthy();
  });

  it("should have correct meta information", () => {
    expect(plugin.meta?.name).toBe("eslint-plugin-better-cap-config");
    expect(plugin.meta?.version).toBe("0.0.1");
  });

  it("should have circular reference resolved in configs", () => {
    expect((plugin.configs?.recommended as any).plugins).toBeTruthy();
    expect((plugin.configs?.recommended as any).plugins["cap-config"]).toBe(
      plugin,
    );
  });
});
