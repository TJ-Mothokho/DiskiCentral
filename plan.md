# DiskiCentral implementation plan

## Objective
Implement the DiskiCentral football-first frontend from the supplied PDF design reference, while preserving the existing Next.js, TypeScript, Tailwind, API-Football endpoint layer, article services, authentication services, and live-game infrastructure.

## Design direction
- **Design movement:** editorial sports intelligence with quiet Swiss utility.
- **Core principles:** football information first; restrained cards; compact metadata; data that earns emphasis; responsive layouts designed for mobile rather than merely shrunk.
- **Color philosophy:** deep forest carries trust and navigation, pitch lime marks focus/live/progress, canvas and white surfaces keep dense data calm, and red/blue stay semantic for live and away/data states.
- **Layout paradigm:** wide editorial canvas with a primary match feed and a supporting intelligence rail; detail pages use a strong dark hero followed by modular evidence blocks.
- **Signature elements:** forest matchday banners, lime progress bars, compact uppercase metadata labels.
- **Interaction philosophy:** filters and tabs are direct, visible controls; state changes should be obvious without decorative motion.
- **Animation:** use only short opacity/transform transitions for loading, hover, and live-state changes; no autoplay or ornamental motion.
- **Typography:** Inter throughout; bold display headings, compact medium labels, readable body copy.
- **Brand essence:** South African football intelligence for supporters who want the match and the context; calm, informed, direct.
- **Brand voice:** headlines are specific and confident; CTAs are useful and short. Examples: “Form that tells a story.” and “View full standings →”.
- **Wordmark:** typographic DISKI / CENTRAL lockup with tight uppercase tracking.
- **Signature brand color:** pitch lime `#B9F36A`.

## Implementation approach
1. Establish the design tokens, shared shell, navigation, responsive header, buttons, tabs, filters, cards, stat bars, ad slots, loading states, and route manifest.
2. Build matchday/home and fixtures around `getFixtures`, `getLiveFixtures`, `getLeagues`, and `ArticlesService`, with URL-driven date and competition filters and a conservative request footprint.
3. Build match centre with fixture, events, statistics, lineups, player stats, H2H, and a client live subscription adapter that is dormant unless a compatible WebSocket URL is configured.
4. Build leagues, teams, players, and article routes using existing typed endpoints/services. Render only fields supplied by the API and show graceful empty/error states.
5. Add login and registration screens using `AuthContext` and `AuthService` without changing token/session behavior.
6. Run lint/type/build checks and verify route/data boundaries.

## Project structure
- `app/`: route pages and page-level data loading.
- `components/`: shared shell and reusable football/editorial UI.
- `api/`: existing API-Football endpoint functions, response types, and live infrastructure; no duplicate provider integration.
- `services/`: existing REST/auth/article clients, reused unchanged unless a small typed helper is necessary.
- `types/`: existing domain types, reused throughout.
- `public/manus-routes.json`: route manifest for the implemented pages.
