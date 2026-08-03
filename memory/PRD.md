# PRD — Digi-Agent-Coin Cinematic Landing Page

## Original Problem Statement
Transform an existing (imported from Lovable) TanStack Start (Vite + React 19) + Tailwind v4 landing page for "Digi-Agent-Coin" into a cinematic, scroll-driven storytelling experience. Do NOT regenerate the project or convert to Next.js. Use bun. Keep framer-motion for micro-interactions; add gsap, @gsap/react, lenis for scroll choreography.

## Tech Stack
- TanStack Start (Vite, SSR) + React 19 + Tailwind CSS v4 (inline @theme in src/styles.css)
- framer-motion ^12.42.2 (hover/enter micro-interactions)
- gsap 3.15 + @gsap/react (ScrollTrigger, SplitText), lenis 1.3 (smooth scroll)
- Package manager: bun (installed at /root/.bun/bin/bun)
- Dev server: supervisor "frontend" runs shim /app/frontend/package.json → `bun run dev --port 3000 --host 0.0.0.0` at /app
- vite.config.ts: added `server.allowedHosts: true` for the preview domain

## Storytelling Arc (Implemented — Jun 2026)
1. **Hero.tsx** — SplitText char reveal on load (power3.out, 0.045 stagger); pinned ~1 viewport; bg gradient parallax (yPercent 30 ≈ 0.3x); coin parallax + scale; content fades/scales on scrub.
2. **Content.tsx (Summary)** — sticky left column (md:sticky top-28); right paragraphs converted to cards, ScrollTrigger.batch slide-in (x:56→0, stagger 0.1, once).
3. **Tokenomics.tsx** — new bento stat grid (Total supply / Total raise / Initial circulating) with GSAP count-up on section entry (power3.out, once) + framer-motion 3D tilt on hover (springs, transformPerspective 1000).
4. **SaleDetails.tsx** — rewritten from tabs to horizontal scroll-jacked track (pin + translateX scrub, lg + motion-ok only); each round card wipes in via clip-path inset (power3.out) using containerAnimation triggers. Mobile fallback: native horizontal overflow scroll.
5. **CTA.tsx (new)** — final pinned section (+=50%), scale/fade entrance, mouse-position radial gradient via --cta-x/--cta-y CSS vars, button whileHover scale 1.05.
- Lenis smooth scroll wired in src/routes/index.tsx via useLenis() (gsap ticker sync, anchors offset -80); lenis CSS in styles.css.
- Shared setup: src/components/digi/scroll.ts (plugin registration, MOTION_OK media query, useLenis).

## Motion Rules Honored
- power3.out reveals, `none` for scrubbed values; stagger 0.08–0.12 for sibling cards (0.045 for split chars)
- All scroll animations gated behind gsap.matchMedia("(prefers-reduced-motion: no-preference)") → final state renders w/o motion
- Transform/opacity/clip-path only; hover 200–300ms transform+shadow

## Fixes Along the Way
- Lovable-hosted assets (/__l5e/assets-v1/...) 404'd outside Lovable → downloaded all 7 images into /app/public/__l5e/assets-v1/... (same paths; no code changes)
- SplitText kerning loss made "AGENT." wrap → whitespace-nowrap on headline spans

## What's Been Implemented (updates)
- Jun 2026 (session 2): Verified allowedHosts fix end-to-end (testing agent iteration_1: 100% pass, zero console errors). Added: ScrollProgress.tsx (fixed top bar, GSAP scrub scaleX, data-testid scroll-progress-bar), sale step dots in SaleDetails.tsx (4 dots, .sale-dot-active toggled via ScrollTrigger onUpdate with floor mapping, lg-only), Magnetic.tsx (framer-motion spring wrapper) applied to hero/nav/CTA buttons. data-testids: nav-join-sale-btn, hero-secure-allocation-btn, cta-secure-allocation-btn, sale-step-dots, sale-dot-0..3.

## Backlog / Next
- P1: Scroll progress section labels; keyboard focus states for magnetic buttons
- P2: ScrollTrigger.batch for Team grid; DualUtility panels split-reveal
- P2 (user deferred): `bun run build` production verification against nitro/cloudflare target
