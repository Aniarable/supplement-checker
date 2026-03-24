# Decisions

## 2026-03-23 — No backend
**Decision:** All supplement logic runs client-side. No API, no database, no server.
**Reason:** Zero cost, zero ops, instant results, no rate limits. Dataset is small enough to ship as static JSON.

## 2026-03-23 — Vercel for hosting
**Decision:** Deploy to Vercel free tier.
**Reason:** Zero config, zero cost, great performance, instant deploys from GitHub.

## 2026-03-23 — fuse.js for autocomplete
**Decision:** Use fuse.js for fuzzy supplement name matching.
**Reason:** Lightweight, runs in the browser, handles aliases well (e.g. "mag glycinate" -> magnesium).

## 2026-03-23 — Static JSON dataset
**Decision:** Master supplement data lives in one flat JSON file.
**Reason:** Simple, version controlled, easy to update, no migration headaches.

## 2026-03-23 — SEO pair pages
**Decision:** Pre-render supplement pair landing pages at /stack/[a]-[b].
**Reason:** These match exact high-volume search queries. Primary traffic driver.
