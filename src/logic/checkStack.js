/**
 * checkStack.js -- Pure JS interaction engine for supplement checker.
 * No dependencies. All functions are pure and independently testable.
 */

export function resolve(name, supplements) {
  const lower = name.toLowerCase().trim();
  return supplements.find(
    (s) =>
      s.supplement === lower ||
      s.aliases.some((a) => a.toLowerCase() === lower)
  ) || null;
}

export function findInteractions(resolved) {
  const names = new Set(resolved.map((s) => s.supplement));
  const seen = new Set();
  const results = [];

  for (const supp of resolved) {
    for (const interaction of supp.interactions) {
      if (!names.has(interaction.with)) continue;

      const pair = [supp.supplement, interaction.with].sort();
      const key = pair.join("|");
      if (seen.has(key)) continue;
      seen.add(key);

      results.push({
        pair,
        type: interaction.type,
        note: interaction.note,
      });
    }
  }

  return results;
}

export function findRedundancies(resolved, threshold = 2) {
  const results = [];

  for (let i = 0; i < resolved.length; i++) {
    for (let j = i + 1; j < resolved.length; j++) {
      const a = resolved[i];
      const b = resolved[j];
      const shared = a.goals.filter((g) => b.goals.includes(g));

      if (shared.length >= threshold) {
        results.push({
          pair: [a.supplement, b.supplement].sort(),
          sharedGoals: shared,
          note:
            "Both target " +
            shared.join(", ") +
            " -- may be redundant",
        });
      }
    }
  }

  return results;
}

export function optimizeTiming(resolved) {
  const morning = [];
  const evening = [];
  const withFood = [];
  const emptyStomach = [];
  const spacingWarnings = [];

  const names = new Set(resolved.map((s) => s.supplement));

  for (const supp of resolved) {
    const name = supp.supplement;
    const best = supp.timing.best || "morning";

    if (best === "evening") {
      evening.push(name);
    } else {
      morning.push(name);
    }

    if (supp.timing.with_food) {
      withFood.push(name);
    } else {
      emptyStomach.push(name);
    }
  }

  const seenSpacing = new Set();
  for (const supp of resolved) {
    for (const interaction of supp.interactions) {
      if (interaction.type !== "competition") continue;
      if (!names.has(interaction.with)) continue;

      const pair = [supp.supplement, interaction.with].sort();
      const key = pair.join("|");
      if (seenSpacing.has(key)) continue;
      seenSpacing.add(key);

      const spacing = extractSpacing(interaction.note);
      if (spacing) {
        spacingWarnings.push(
          "Space " + pair[0] + " and " + pair[1] + " " + spacing
        );
      }
    }
  }

  return { morning, evening, withFood, emptyStomach, spacingWarnings };
}

function extractSpacing(note) {
  const match = note.match(/space\s+(\d+\s*hr\s*apart)/i);
  if (match) return match[1];
  const match2 = note.match(/(\d+\s*hr?\s*apart)/i);
  if (match2) return match2[1];
  return null;
}

export function findGaps(resolved, supplements) {
  const stackNames = new Set(resolved.map((s) => s.supplement));
  const seen = new Set();
  const results = [];

  for (const supp of resolved) {
    if (!supp.commonly_with) continue;

    for (const rec of supp.commonly_with) {
      const recName = rec.supplement.toLowerCase();
      if (stackNames.has(recName)) continue;
      if (seen.has(recName)) continue;

      const exists = supplements.some((s) => s.supplement === recName);
      if (!exists) continue;

      seen.add(recName);
      results.push({
        supplement: recName,
        reason: rec.reason,
      });
    }
  }

  return results;
}

export function checkStack(stack, supplements) {
  if (!stack || stack.length === 0) {
    return { interactions: [], redundancies: [], timing: { morning: [], evening: [], withFood: [], emptyStomach: [], spacingWarnings: [] }, gaps: [] };
  }

  const unique = [...new Set(stack.map((s) => s.toLowerCase().trim()))];
  const resolved = unique
    .map((name) => resolve(name, supplements))
    .filter(Boolean);

  if (resolved.length === 0) {
    return { interactions: [], redundancies: [], timing: { morning: [], evening: [], withFood: [], emptyStomach: [], spacingWarnings: [] }, gaps: [] };
  }

  return {
    interactions: findInteractions(resolved),
    redundancies: findRedundancies(resolved),
    timing: optimizeTiming(resolved),
    gaps: findGaps(resolved, supplements),
  };
}
