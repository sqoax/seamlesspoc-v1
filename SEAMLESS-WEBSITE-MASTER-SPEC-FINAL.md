# SEAMLESS-WEBSITE-MASTER-SPEC.md

**Project:** Final rebuild of seamlesspoc.com — Seamless Point of Care (dba of IRG of Georgia, Tucker, GA)
**Status:** Approved build authority · August 2026
**Owner:** Hiatt (Celnu)

## 0. Authority

This document is the final source of truth for the build. Precedence:

1. **This Master Spec** — approved strategic decisions and launch requirements.
2. **The `seamless-poc-frontend` skill** — implementation detail (tokens, component specs, Astro conventions, checklists). Where the skill says "pending Master Spec approval," the decisions in this document ARE that approval.
3. The full strategy document (`seamless-poc-website-strategy.md`) — background and rationale. Consult it for reasoning; do not mine it for claims not restated here.

Anything marked **TBD** (a decision not yet made) or **VERIFY** (a fact not yet confirmed) must be resolved by Hiatt before it ships. Nothing marked TBD/VERIFY may be guessed, filled with a plausible value, or shipped as-is.

## 1. Positioning (APPROVED)

Seamless Point of Care is the Southeast's specialist installation partner for the hardware that puts technology at the point of care. It helps hospitals choose the right mount, cart, cabinet, or display; supplies it on one quote; installs it in live clinical environments after hours with consistent, experienced crews; and maintains it for the life of the equipment.

- **Category descriptor: TBD — final category descriptor.** Working default for builds and comps: "Clinical technology installation & mounting" (open question: whether "mounting" reads too narrow). Final wording resolves via the open-items registry (#19) before launch.
- **Permanent prohibitions:** never "Healthcare IT," "IT Solutions," or any "IT" descriptor; never "Products" and "Solutions" as sibling nav items.
- **Brand:** keep the Seamless name and logo. Fresh identity within strategy constraints — refinement, not rebrand.
- **Scope line (sitewide):** "You own the technology; we install and maintain what holds it."

## 2. Audience & conversion (APPROVED)

- **Primary audience:** hospital IT directors / desktop-services managers; clinical & nursing informatics; facilities/construction PMs. Secondary: clinical engineering, procurement, nurse leadership. Existing customers get a distinct service path.
- **Primary conversion:** **Start a Project** — dedicated page (never a modal), trigger-checkbox form per the skill's spec.
- **Secondary conversions:** Request Service (most major makes and models) · Request an evaluation unit · phone (header + mobile menu, click-to-call) · capabilities PDF (ungated).
- **Commitment:** confirmation copy states a response window. Window value: **TBD** (Hiatt to set; nothing ships with a placeholder number).
- **Analytics:** privacy-light (no cookie-consent stack); track form submissions and `tel:` taps.

## 3. Sitemap & navigation (APPROVED)

Nav (7 items + button): **Services · What We Install · Where We Work · Projects · How We Work · About · [Start a Project]**, phone in header, "Request Service" utility link.

**Launch core (required — nothing else blocks launch):**
- Home
- Services: one overview page covering all four service lines in depth. Individual service pages are expansion, added as their content is ready (Cable Management first, once a before/after pair exists).
- What We Install: one overview page representing all 8 categories. Individual category pages are expansion, added as photos/content are ready.
- Where We Work (single page)
- How We Work
- Projects: index + however many case studies are verified and permitted at launch — quality over count; two excellent beats three thin. No filler.
- About: one page at launch (company, team, customers together). Subpages are expansion.
- Start a Project · Request Service · Contact · capabilities PDF · 301 redirect map from legacy URLs (per skill)

**Expansion (add as content is verified — no re-approval needed):** individual service pages · individual category pages (all 8 over time) · additional case studies · About subpages (Team, Customers, Manufacturers & Partners — the last only with VERIFIED authorizations) · technician profiles · published maintenance checklist.
**Not built:** per-environment pages, careers, blog/resources, parts store, "Why Seamless" page.

## 4. Homepage structure (APPROVED — 9 sections, this order)

1. Hero — real finished-room photo; headline direction *"Technology installed in hospitals, by people who work in hospitals every day."*; noun-list sub ending "Live units. After hours. Consistent, experienced crews."; CTAs Start a project / See our work.
2. What we install — 8 photo cards.
3. Problem-based entry points — 4–6 customer-voice statements (never typeset as quoted testimony).
4. How we work — 6-step strip + scope line.
5. Why hospitals keep using us — four behaviors in verified-safe language; crew photo; up to 3 VERIFIED numbers; one verified + permitted testimonial; a two-sentence "extend your team's capacity" statement (partnership framing — installs handled without pulling internal IT off their work; never adversarial toward hospital IT teams).
6. Recent projects — 3 cards, one number each.
7. Health systems we work with — verified + permitted names/logos by state.
8. Existing equipment — service for most major makes and models → Request service.
9. Final CTA band + footer.

Above the fold: section 1 + top edge of section 2 (desktop); section 1 (mobile). Hero wording may be refined; shape and section order may not change without amending this spec.

## 5. Content & claims (LAUNCH REQUIREMENTS)

- **Voice:** plain language, short sentences, nouns and numbers, sentence case, no exclamation points. Ban list per the skill (innovative, cutting-edge, transforming, empowering, bare "solutions," "seamless" as adjective, world-class, leverage, robust, IT Ninjas, stealth, improved census, "small company").
- **Verification gate:** every number, customer name, logo, testimonial, certification, and experience claim renders only from `verified: true` content; names/logos/testimonials additionally require `permission === true` explicitly. Unresolved inline copy carries `⟦VERIFY⟧` markers; the ship check fails on any remaining marker.
- **Absolute performance claims** ("same crew every time," "no callbacks," "every deadline," any always/never/100%) require individual verification; default to verified-safe phrasing.
- **Retired permanently:** IT Ninjas / stealth-like / saving-the-day copy; "improved census"; "Healthcare IT Solutions"; unsourced statistics bands; testimonials referencing "IRG" as-is; pre-merger institution names.
- **Survey-derived customer statements** are employee reconstructions: usable as problem-entry phrasing, never as attributed quotes.
- **Copy sources:** the strategy's Part 9 content inventory (P1/P2 rows) — do not invent new claims.

## 6. Design & technical (APPROVED)

- **Stack:** Astro, fully static, no Tailwind/React; islands only for nav toggle, form submit, optional before/after slider. Deploy: Vercel or Cloudflare Pages.
- **Design system:** per the skill's token file — quiet authority, warm paper neutrals, one deep primary + one CTA accent, no gradients, 2px radii, thin rules over boxes, one self-hosted variable sans, tabular numerals on proof figures. **Color and type token values are PROVISIONAL until reconciled with the actual logo files (VERIFY — Hiatt to supply logo SVG + existing brand values).**
- **Photography:** real installations only; floor in frame for cable-management proof; no patients/PHI/readable screens; no stock or AI hospital imagery ever. Placeholder blocks double as the shot list and never ship.
- **Motion:** hover/focus transitions and at most a subtle fade-in; everything behind `prefers-reduced-motion`.
- **Budgets:** Lighthouse mobile ≥ 95 performance & accessibility; LCP < 2.0s throttled; JS < 30KB gz/page; CLS < 0.05; WCAG AA contrast; 375px-first review.
- **SEO/AI legibility:** title/meta written as plain buyer-question answers; LocalBusiness + Service JSON-LD (areaServed = VERIFY service states); sitemap; concrete nouns in copy.
- **Forms:** endpoint-agnostic markup behind `PUBLIC_FORM_ENDPOINT`; degrade to plain POST; honeypot. Endpoint choice (Cloudflare Worker vs. form service): **TBD**.

## 7. Launch gates (Gate 0 — gates *shipping*, not starting)

**Explicitly allowed before Gate 0 is complete:** wireframes, design tokens, the component library, page shells, responsive behavior, form markup, and full placeholder-driven builds using the skill's `PHOTO-PLACEHOLDER` and `⟦VERIFY⟧` systems. Gate 0 gates the *ship-ready sign-off and launch* of pages, not build-system or structural work — the two tracks run in parallel.

Counts below are **targets, not minimums** — quality and permission beat quantity. Two excellent case studies and six strong approved customer names outweigh hitting the numbers with thin material. The only hard floors are marked.

1. Real installation photography sufficient to carry the launch pages — target ~15 images. **Hard floor:** at least one before/after cable pair before the Cable Management content ships. Shoot status: **TBD**.
2. Verified + permitted case studies with numbers — target 3; ship with fewer if they're strong.
3. Customer names/logos with written permission and current legal names — target 10.
4. Fresh testimonials with current titles and permission — target 3.
5. One approved experience statement (replaces the 25/15+/20+ conflict): **VERIFY**.
6. Leadership-approved do/don't scope statement, resolving the cabling-scope and trash-removal ambiguities: **VERIFY**.
7. Credentials sheet (certifications, hospital credentialing, insurance, licensing): **VERIFY**.
8. Response-window and quoting-model commitments ("fixed cost," "low change orders" only if true): **VERIFY**.
9. Capabilities PDF content assembled from items 3–8.

## 8. Open items registry (consolidated TBD/VERIFY)

| # | Item | Type | Blocks |
|---|---|---|---|
| 1 | Logo SVG + existing brand color values → reconcile provisional tokens | VERIFY | Final visual system, favicon/OG |
| 2 | Photography shoot scheduling and asset delivery | TBD | Gate 0, all ship-ready pages |
| 3 | Single experience statement | VERIFY | About, homepage, PDF |
| 4 | Customer names/logos/testimonials — currency + permission | VERIFY | Sections 4.5–4.7, Customers, Projects |
| 5 | Manufacturer authorizations | VERIFY | Partners page, footer logos, category-page brand lists |
| 6 | Do/don't scope statement (incl. cabling scope, trash removal) | VERIFY | Services, How We Work |
| 7 | Clinical-equipment mounting scope (anesthesia machines, GE monitors) + any manufacturer requirements | VERIFY | Anesthesia & Clinical Mounts page |
| 8 | Service area (states) + travel policy | VERIFY | Where We Work, JSON-LD, PDF |
| 9 | Response window + site-survey scheduling window | TBD | Forms, How We Work |
| 10 | Quoting model claims (fixed cost, low change orders, custom-at-no-extra) | VERIFY | How We Work |
| 11 | Form endpoint (Worker vs. service) | TBD | Forms wiring |
| 12 | Virtual nursing / telehealth hardware installs — in or out of What We Install | TBD | Category set, competitive coverage |
| 13 | Veteran-owned status / certifications | VERIFY | About |
| 14 | Asset Protection Plan terms + Maintenance Visit contents | VERIFY | Service & Maintenance page |
| 15 | Team facts (headcount, technicians, tenure) | VERIFY | Team, homepage section 5 numbers |
| 16 | Evaluation units — still offered, free or paid | VERIFY | Solution Finding, CTAs |
| 17 | Address/phone confirmation | VERIFY | Everywhere |
| 18 | Founders' current roles/bios | VERIFY | Team |
| 19 | Final category descriptor (is "mounting" too narrow?) — working default: "Clinical technology installation & mounting" | TBD | Logo lockup, title tags, footer, PDF |

## 9. What NOT to do (binding)

No Products/Solutions nav split · no "Healthcare IT" anywhere · no stock or AI hospital imagery · no unverified claim, name, logo, or number · no absolute performance claims without verified basis · no popup for the primary conversion · no gradients, parallax, counters, carousels, video, chat widgets · no blog at launch · no *shipping or launching* pages before their Gate 0 assets exist (wireframes, tokens, components, and placeholder-driven page shells are explicitly allowed in parallel) · no filler pages to pad the launch · no guessing any TBD/VERIFY item.

---
*Amendments to sections 1–4 and 9 require Hiatt's explicit sign-off recorded in this file. Everything else defers to the `seamless-poc-frontend` skill.*
