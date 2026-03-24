import { describe, it, expect } from "vitest";
import supplements from "../src/data/supplements.json" with { type: "json" };
import {
  resolve,
  findInteractions,
  findRedundancies,
  optimizeTiming,
  findGaps,
  checkStack,
} from "../src/logic/checkStack.js";

describe("resolve", () => {
  it("finds by exact name", () => {
    const result = resolve("magnesium", supplements);
    expect(result).not.toBeNull();
    expect(result.supplement).toBe("magnesium");
  });

  it("finds by alias", () => {
    const result = resolve("fish oil", supplements);
    expect(result).not.toBeNull();
    expect(result.supplement).toBe("omega-3");
  });

  it("is case-insensitive", () => {
    const result = resolve("Vitamin-D", supplements);
    expect(result).not.toBeNull();
    expect(result.supplement).toBe("vitamin-d");
  });

  it("returns null for unknown supplement", () => {
    expect(resolve("unobtainium", supplements)).toBeNull();
  });
});

describe("findInteractions", () => {
  it("finds competition between magnesium and zinc", () => {
    const resolved = [resolve("magnesium", supplements), resolve("zinc", supplements)];
    const result = findInteractions(resolved);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("competition");
    expect(result[0].pair).toEqual(["magnesium", "zinc"]);
  });

  it("finds synergy between magnesium and vitamin-d", () => {
    const resolved = [resolve("magnesium", supplements), resolve("vitamin-d", supplements)];
    const result = findInteractions(resolved);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("synergy");
  });

  it("deduplicates pairs", () => {
    const resolved = [resolve("vitamin-d", supplements), resolve("magnesium", supplements)];
    const result = findInteractions(resolved);
    expect(result).toHaveLength(1);
  });

  it("returns empty for non-interacting supplements", () => {
    const resolved = [resolve("creatine", supplements), resolve("probiotics", supplements)];
    const result = findInteractions(resolved);
    expect(result).toHaveLength(0);
  });

  it("finds multiple interactions in a larger stack", () => {
    const resolved = [
      resolve("magnesium", supplements),
      resolve("zinc", supplements),
      resolve("vitamin-d", supplements),
    ];
    const result = findInteractions(resolved);
    expect(result.length).toBeGreaterThanOrEqual(2);
  });
});

describe("findRedundancies", () => {
  it("flags magnesium and ashwagandha (shared: sleep, stress)", () => {
    const resolved = [resolve("magnesium", supplements), resolve("ashwagandha", supplements)];
    const result = findRedundancies(resolved);
    expect(result).toHaveLength(1);
    expect(result[0].sharedGoals).toContain("sleep");
    expect(result[0].sharedGoals).toContain("stress");
  });

  it("does not flag supplements with only 1 shared goal", () => {
    const resolved = [resolve("zinc", supplements), resolve("vitamin-c", supplements)];
    const result = findRedundancies(resolved);
    expect(result).toHaveLength(0);
  });
});

describe("optimizeTiming", () => {
  it("puts magnesium in evening", () => {
    const resolved = [resolve("magnesium", supplements)];
    const result = optimizeTiming(resolved);
    expect(result.evening).toContain("magnesium");
  });

  it("puts vitamin-d in morning", () => {
    const resolved = [resolve("vitamin-d", supplements)];
    const result = optimizeTiming(resolved);
    expect(result.morning).toContain("vitamin-d");
  });

  it("puts iron on empty stomach", () => {
    const resolved = [resolve("iron", supplements)];
    const result = optimizeTiming(resolved);
    expect(result.emptyStomach).toContain("iron");
  });

  it("generates spacing warnings for competing supplements", () => {
    const resolved = [resolve("magnesium", supplements), resolve("zinc", supplements)];
    const result = optimizeTiming(resolved);
    expect(result.spacingWarnings.length).toBeGreaterThan(0);
    expect(result.spacingWarnings[0]).toMatch(/magnesium.*zinc|zinc.*magnesium/i);
  });

  it("puts creatine in morning (any -> morning default)", () => {
    const resolved = [resolve("creatine", supplements)];
    const result = optimizeTiming(resolved);
    expect(result.morning).toContain("creatine");
  });
});

describe("findGaps", () => {
  it("suggests k2 when taking vitamin-d without it", () => {
    const resolved = [resolve("vitamin-d", supplements)];
    const result = findGaps(resolved, supplements);
    const k2 = result.find((g) => g.supplement === "vitamin-k2");
    expect(k2).toBeDefined();
  });

  it("does not suggest k2 when already in stack", () => {
    const resolved = [resolve("vitamin-d", supplements), resolve("vitamin-k2", supplements)];
    const result = findGaps(resolved, supplements);
    const k2 = result.find((g) => g.supplement === "vitamin-k2");
    expect(k2).toBeUndefined();
  });

  it("suggests vitamin-c when taking iron", () => {
    const resolved = [resolve("iron", supplements)];
    const result = findGaps(resolved, supplements);
    const vc = result.find((g) => g.supplement === "vitamin-c");
    expect(vc).toBeDefined();
  });
});

describe("checkStack", () => {
  it("returns empty results for empty stack", () => {
    const result = checkStack([], supplements);
    expect(result.interactions).toHaveLength(0);
    expect(result.redundancies).toHaveLength(0);
    expect(result.gaps).toHaveLength(0);
  });

  it("handles unknown supplement names gracefully", () => {
    const result = checkStack(["unobtainium"], supplements);
    expect(result.interactions).toHaveLength(0);
  });

  it("deduplicates stack entries", () => {
    const result = checkStack(["magnesium", "MAGNESIUM", "Magnesium"], supplements);
    expect(result.timing.evening).toHaveLength(1);
  });

  it("produces full results for a real stack", () => {
    const result = checkStack(
      ["magnesium", "zinc", "vitamin-d", "ashwagandha"],
      supplements
    );
    expect(result.interactions.length).toBeGreaterThan(0);
    expect(result.timing.morning.length).toBeGreaterThan(0);
    expect(result.timing.evening.length).toBeGreaterThan(0);
    expect(result.gaps.length).toBeGreaterThan(0);
  });
});
