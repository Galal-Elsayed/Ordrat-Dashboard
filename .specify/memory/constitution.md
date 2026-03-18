<!--
SYNC IMPACT REPORT
==================
Version change: [TEMPLATE] → 1.0.0 (initial ratification)

Modified principles:
  - [PRINCIPLE_1_NAME] → I. Component-First Design (new)
  - [PRINCIPLE_2_NAME] → II. Type Safety (new)
  - [PRINCIPLE_3_NAME] → III. Server/Client Boundary Discipline (new)
  - [PRINCIPLE_4_NAME] → IV. Data Layer Integrity (new)
  - [PRINCIPLE_5_NAME] → V. Observability & Quality Gates (new)
  - [SECTION_2_NAME]   → Technology Stack (new)
  - [SECTION_3_NAME]   → Development Workflow (new)

Added sections: Technology Stack, Development Workflow
Removed sections: none

Templates requiring updates:
  ✅ .specify/templates/plan-template.md — Constitution Check section already
     references constitution gates generically; compatible as-is.
  ✅ .specify/templates/spec-template.md — No principle-specific references;
     compatible as-is.
  ✅ .specify/templates/tasks-template.md — Task categories (setup, foundation,
     user stories) align with this constitution; no updates needed.

Follow-up TODOs:
  - TODO(RATIFICATION_DATE): Exact adoption date not supplied; defaulted to
    today (2026-03-18). Update if the project was formally started earlier.
-->

# Ordrat Dashboard Constitution

## Core Principles

### I. Component-First Design

Every UI feature MUST be built as composable, reusable components before being
wired into pages. Components MUST follow the ReUI design system conventions and
Tailwind CSS 4 utility patterns. Ad-hoc inline styles are prohibited; all
styling MUST go through Tailwind classes or design-system tokens.

- Components MUST be self-contained: props-driven, no hidden global state.
- Shared components belong in `components/`; page-specific components live
  co-located in their route directory.
- Any new component that could reasonably be reused in two or more places MUST
  be extracted to `components/` before the PR merges.

**Rationale**: The project is built on Metronic 9 + ReUI. Deviating from the
design system creates visual inconsistency and accumulates design debt that
blocks future theming and white-labeling.

### II. Type Safety (NON-NEGOTIABLE)

All code MUST be written in TypeScript. `any` is forbidden unless accompanied
by an inline `// SAFE: <reason>` comment approved in code review. Implicit
`any` via missing type annotations is equally forbidden.

- API response shapes MUST be typed end-to-end (Prisma types on the server,
  explicit interfaces on the client).
- `zod` or equivalent schema validation MUST be used at every external boundary
  (form inputs, API route bodies, external API responses).
- `tsconfig.json` strict mode MUST remain enabled; loosening compiler flags
  requires a constitution amendment.

**Rationale**: Type safety is the primary tool for preventing runtime errors in
a dashboard that handles real business data (orders, users, store inventory).

### III. Server/Client Boundary Discipline

Next.js App Router conventions MUST be followed precisely.

- Components that fetch data directly MUST be React Server Components (RSC) by
  default; `"use client"` MUST only be added when browser APIs, event handlers,
  or client-side state are strictly required.
- Server Actions MUST be used for all form mutations; raw `fetch` from client
  components to internal API routes is discouraged.
- Secrets and environment variables MUST never be imported into client
  components. `NEXT_PUBLIC_` prefix is the only permitted exception.
- Auth session access MUST go through `@auth/core` / `next-auth` helpers;
  manual JWT parsing in components is forbidden.

**Rationale**: Incorrect server/client separation causes security leaks (secrets
in bundles) and performance regressions (unnecessary client-side waterfalls).

### IV. Data Layer Integrity

Prisma MUST be the sole ORM for all database operations. Raw SQL is permitted
only for queries that Prisma cannot express, and MUST be reviewed by a senior
engineer.

- All schema changes MUST go through `prisma migrate dev` (development) or
  `prisma migrate deploy` (CI/production); manual schema edits to the database
  are prohibited.
- Every write operation MUST be wrapped in appropriate error handling; unhandled
  Prisma errors MUST NOT propagate to the HTTP response layer as-is.
- Sensitive fields (passwords, tokens) MUST be hashed or encrypted before
  persistence; bcrypt is the approved algorithm for passwords.

**Rationale**: Data integrity failures in a store/user-management dashboard have
direct business impact (lost orders, account takeovers).

### V. Observability & Quality Gates

- All API routes MUST return structured JSON error responses; no plain-text
  error strings in production.
- Client-side errors MUST be caught at component boundaries using React Error
  Boundaries; unhandled promise rejections in client code are a blocker.
- Loading and empty states MUST be implemented for every data-fetching component;
  a component that can show data MUST also handle the loading and zero-data
  cases.
- `npm run lint` and `npm run build` MUST pass with zero errors before any PR
  can merge.

**Rationale**: Dashboard users depend on reliable feedback. Silent failures and
broken loading states erode trust and generate support requests.

## Technology Stack

| Layer | Technology | Pinned Version |
|---|---|---|
| Framework | Next.js | 15.3.x |
| UI Runtime | React | 19.x |
| Styling | Tailwind CSS | 4.x |
| Component Library | ReUI | latest compatible |
| ORM | Prisma | per `package.json` |
| Database | PostgreSQL | 17.4.x |
| Auth | NextAuth / @auth/core | per `package.json` |
| State / Data Fetching | TanStack Query | per `package.json` |
| Tables | TanStack Table | per `package.json` |
| Charts | ApexCharts | per `package.json` |
| Forms | React Hook Form + Zod | per `package.json` |

Upgrades to major versions of any item in this table MUST be proposed as a
constitution amendment and tested in a dedicated branch before merging to main.

## Development Workflow

**Branching**: All feature work MUST be done on a branch named
`###-short-description` (e.g., `042-order-export`). Direct commits to `main`
are prohibited.

**Code Review**: Every PR requires at least one approval. The reviewer MUST
verify:
1. No `any` without `// SAFE:` justification.
2. `"use client"` usage is minimal and justified.
3. New UI components follow the ReUI/Tailwind design system.
4. No secrets in client bundles.
5. `npm run lint` and `npm run build` pass.

**Quality Gates** (enforced in CI):
- `npm run lint` — zero warnings treated as errors.
- `npm run build` — zero TypeScript or compilation errors.
- `npx prisma validate` — schema must be valid on every migration PR.

**Feature Work**: All features MUST be specified via the speckit workflow
(`.specify/`) before implementation begins. Unspecified features are not
permitted to merge.

## Governance

This constitution supersedes all other practices, conventions, and prior
agreements in the Ordrat Dashboard repository. In cases of conflict, the
constitution wins.

**Amendment procedure**:
1. Open a PR modifying `.specify/memory/constitution.md`.
2. Describe the motivation and impact in the PR description.
3. Bump `CONSTITUTION_VERSION` following semantic versioning:
   - MAJOR: principle removed or fundamentally redefined.
   - MINOR: new principle or section added.
   - PATCH: clarification, wording, or typo fix.
4. Propagate changes to affected templates (see consistency checklist in the
   speckit.constitution command).
5. Require approval from at least one project maintainer.

**Compliance review**: Constitution compliance MUST be verified at every code
review. Any PR that violates a principle MUST be blocked until the violation is
resolved or a formal amendment grants an exception.

**Versioning policy**: Version line at the bottom of this file is the single
source of truth. Do not maintain separate version files.

**Version**: 1.0.0 | **Ratified**: 2026-03-18 | **Last Amended**: 2026-03-18
