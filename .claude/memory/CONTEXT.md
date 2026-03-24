# Context

## Business Model
- Primary revenue: Google AdSense (RPM $8-15 in health/supplement niche)
- Traffic source: SEO — supplement pair queries ("can you take X and Y together")
- Secondary: expand to bloodwork decoder, bio age estimator as the site grows

## Target Audience
Biohackers — obsessive readers who Google everything about their supplement stacks.
High intent, high RPM advertisers (supplement brands, health products).

## Why This Stack
- No backend = zero hosting cost, zero ops, zero latency
- Vercel free tier handles the traffic easily until significant scale
- All logic client-side = instant results, no API rate limits
- Static JSON dataset = easy to update, version controlled

## SEO Strategy
Each supplement pair gets its own URL: /stack/ashwagandha-magnesium
These answer exact queries people search. Pre-rendered for fast indexing.
High-volume target pairs: ashwagandha+magnesium, creatine+caffeine, vitamin-d+k2,
NAC+glycine, magnesium+zinc, omega3+vitamin-d, berberine+metformin.

## Decisions
- No backend (decided upfront — keep it simple, zero cost)
- fuse.js for fuzzy search (lightweight, no server needed)
- Flat JSON for supplement data (simple, version controlled, easy to expand)
