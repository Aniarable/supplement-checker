# Supplement Checker — CLAUDE.md

## Project Overview
A biohacking web app where users input their supplement stack and get:
- Interaction flags (conflicts and synergies between supplements)
- Redundancy warnings (two supps doing the same thing)
- Timing optimizer (morning/evening, with/without food, spacing)
- Missing gaps (commonly co-supplemented items they're not taking)

Monetized via Google AdSense. SEO-driven traffic via supplement pair landing pages.

## Stack
- Frontend: React + Vite
- Routing: react-router-dom
- Fuzzy search: fuse.js
- Hosting: Vercel (free tier)
- Ads: Google AdSense
- Database: None — supplement data is static JSON

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run test` — run tests

## Project Structure
```
supplement-checker/
  src/
    data/
      supplements.json     # master supplement dataset (75 supps)
    components/
      StackInput.jsx        # autocomplete input + tag list
      ResultsPanel.jsx      # interaction/timing output
    logic/
      checkStack.js         # pure JS interaction engine
    pages/
      Home.jsx              # main checker page
      StackPairPage.jsx     # SEO pair landing pages
  public/
    stacks/                 # pre-rendered SEO pages
  tests/
```

## Key Rules
- All supplement logic is client-side only — no backend, no API calls
- Never add a backend unless explicitly decided
- AdSense placeholder divs go in the layout between input and results
- SEO pages follow the URL pattern: /stack/[supplement-a]-[supplement-b]
- Keep the dataset in one flat JSON file — no database

## Data Schema (supplements.json)
```json
{
  "supplement": "magnesium",
  "aliases": ["mag glycinate", "mag citrate"],
  "timing": { "best": "evening", "with_food": true },
  "interactions": [
    { "with": "zinc", "type": "competition", "note": "compete for absorption -- space 2hr apart" },
    { "with": "vitamin-d", "type": "synergy", "note": "D3 increases mag utilization" }
  ],
  "goals": ["sleep", "recovery", "stress"],
  "category": "mineral"
}
```
