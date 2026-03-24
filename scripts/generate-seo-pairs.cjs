const fs = require('fs');
const path = require('path');

const supps = require('../src/data/supplements.json');
const existing = require('../src/data/seo-pairs.json');
const existingSlugs = new Set(existing.map(p => p.slug));

function capitalize(str) {
  return str.replace(/(^|-)\S/g, c => c === '-' ? ' ' : c.toUpperCase())
    .replace(/-/g, ' ')
    .replace(/\b(nac|coq10|egcg|dha|epa|pqq|nmn|nad)\b/gi, m => m.toUpperCase())
    .replace(/\bl-/gi, 'L-')
    .replace(/\bk2\b/gi, 'K2')
    .replace(/\bb-/gi, 'B-')
    .replace(/\bd3\b/gi, 'D3');
}

function timingLabel(t) {
  if (!t) return 'any time';
  return t.best || 'any time';
}

function timingRec(aTime, bTime, type) {
  const aLabel = timingLabel(aTime);
  const bLabel = timingLabel(bTime);
  if (type === 'competition') {
    return `Space them apart -- take one in the morning and the other in the evening for best absorption.`;
  }
  if (aLabel === bLabel) {
    return `Take both in the ${aLabel}${aTime && aTime.with_food ? ' with food' : ''}.`;
  }
  return `Take them at their optimal times -- one in the ${aLabel}, the other in the ${bLabel}.`;
}

function suppTimingNote(name, timing) {
  if (!timing) return 'No specific timing requirements.';
  const parts = [];
  parts.push(`Best taken in the ${timing.best || 'any time'}.`);
  if (timing.with_food) parts.push('Take with food for better absorption.');
  else parts.push('Can be taken on an empty stomach.');
  return parts.join(' ');
}

function introText(nameA, nameB, type, note) {
  if (type === 'synergy') {
    return `${nameA} and ${nameB} are a powerful combination. ${note} Here's what you need to know about taking them together safely and effectively.`;
  }
  if (type === 'competition') {
    return `${nameA} and ${nameB} can interact when taken together. ${note} Here's how to stack them properly so you get the full benefits of both.`;
  }
  return `${nameA} and ${nameB} are commonly stacked together. ${note} Here's the full breakdown of how they interact and the best way to take them.`;
}

function detailsText(nameA, nameB, type, note) {
  if (type === 'synergy') {
    return `This is a beneficial pairing where the two supplements enhance each other's effects. Many biohackers and health-conscious individuals combine these for amplified results.`;
  }
  if (type === 'competition') {
    return `These two can interfere with each other's absorption when taken at the same time. The solution is simple: space them apart by at least 2 hours to get the full benefit of both.`;
  }
  return `There is no significant positive or negative interaction between these two. They can be taken together safely without concern for interference.`;
}

const generated = [];
const seen = new Set();

supps.forEach(s => {
  (s.interactions || []).forEach(i => {
    const a = s.supplement < i.with ? s.supplement : i.with;
    const b = s.supplement < i.with ? i.with : s.supplement;
    const slug = a + '-' + b;

    if (existingSlugs.has(slug) || seen.has(slug)) return;
    seen.add(slug);

    const suppA = supps.find(x => x.supplement === a);
    const suppB = supps.find(x => x.supplement === b);
    if (!suppA || !suppB) return;

    const nameA = capitalize(a);
    const nameB = capitalize(b);

    const goalsSet = new Set([...(suppA.goals || []), ...(suppB.goals || [])]);

    generated.push({
      slug,
      supplements: [a, b],
      title: `Can You Take ${nameA} and ${nameB} Together?`,
      metaDescription: `Learn whether ${nameA} and ${nameB} can be taken together. Interaction type: ${i.type}. Get timing tips, safety info, and stacking advice.`,
      interaction: {
        type: i.type,
        summary: i.note.charAt(0).toUpperCase() + i.note.slice(1) + (i.note.endsWith('.') ? '' : '.'),
        details: detailsText(nameA, nameB, i.type, i.note)
      },
      timing: {
        recommendation: timingRec(suppA.timing, suppB.timing, i.type),
        suppA: {
          name: a,
          best: (suppA.timing && suppA.timing.best) || 'any',
          withFood: (suppA.timing && suppA.timing.with_food) || false,
          note: suppTimingNote(nameA, suppA.timing)
        },
        suppB: {
          name: b,
          best: (suppB.timing && suppB.timing.best) || 'any',
          withFood: (suppB.timing && suppB.timing.with_food) || false,
          note: suppTimingNote(nameB, suppB.timing)
        }
      },
      goals: [...goalsSet].slice(0, 5),
      intro: introText(nameA, nameB, i.type, i.note)
    });
  });
});

const all = [...existing, ...generated];
const outPath = path.join(__dirname, '..', 'src', 'data', 'seo-pairs.json');
fs.writeFileSync(outPath, JSON.stringify(all, null, 2) + '\n');
console.log(`Done: ${existing.length} existing + ${generated.length} new = ${all.length} total pairs`);
