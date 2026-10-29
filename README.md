# Campus Buddy

A mobile-friendly, interactive campus navigation prototype for a software engineering management project. The demonstration uses the **University of West Florida** as its single example campus.

## Run locally

Requires Node.js 20+ and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, normally **http://localhost:5173**.

To check or preview the production build:

```sh
npm run build
npm run preview
```

## Demonstrate the prototype

1. Select **Continue as Demo Student** to load Alex Morgan and three example classes. Alternatively, create a local profile or sign in with a made-up email and any non-empty demo password.
2. From Home, open **Schedule**, add a class, and select **Attending today**. Use **Get Directions** to carry its building into the route planner.
3. Choose a start and destination, then select **Get Directions**. Try Lot A → Science & Engineering (7 minutes) or Lot B → Science & Engineering (3 minutes).
4. Open **Campus Map** and select a building or parking marker. Use its detail card to open directions or parking details.
5. Explore **Parking**, open a lot, and view its nearby buildings or a simulated walking route.
6. Open **Campus Conditions** from the sidebar or Home’s campus traffic summary. On mobile, the Home summary provides access.
7. Open **Reports**, select **Report Incident**, and submit a sample report. It appears in Reports, Campus Conditions, and Home’s report count.
8. Refresh to check persistence. Use the profile avatar to open **Settings**, reset demo data, or log out.

## Features and technology

- React, Vite, JavaScript, regular CSS, and React Router.
- Responsive desktop sidebar and mobile bottom navigation.
- Demonstration sign-in, registration, returning sessions, and logout.
- Dashboard with current date, next upcoming class, conditions, parking, and working shortcuts.
- Schedule creation/removal and date-scoped attendance selections.
- Interactive SVG/HTML schematic with shared building and parking locations.
- Parking availability, lot details, nearby buildings, and direction links.
- A finite set of illustrative walking routes, reverse routes, and clear messages for unsupported routes.
- Incident validation, confirmation, and shared report lists.
- Profile settings and a confirmed demo-data reset.

Predefined data lives in `src/data/mockData.js`. React context and hooks in `src/state.jsx` keep local state consistent across screens. Browser `localStorage` saves the current demo profile/session, schedule, daily selections, and reports under `campus-buddy-v1`. **Passwords are never saved or verified.** Signing in with the same email restores the current local profile’s data; switching profiles starts a fresh local dataset. This is a single browser demo, not a multi-account system.

## Scope and limitations

This is an **academic demonstration, not a production application**. Course names, locations, meeting times, schematic geography, traffic, reports, parking counts, routes, distances, and walking times are illustrative and unverified. The schematic is not geographically accurate. Use official UWF sources for actual campus travel and parking.

There is no backend, database, real authentication, GPS, mapping service, external API, live occupancy, traffic feed, or report transmission. Routes come from a small predefined dataset; unsupported pairs show a friendly explanation. Preloaded reports use fixed example timestamps. Locally submitted reports use the browser’s submission time. Today’s selections reset when the local calendar date changes. Clearing browser storage removes saved data; storage-disabled browsers show a persistence notice.

## Verification

The production build and automated browser workflows were checked for sign-in/registration, validation, schedule changes, attendance selection, destination handoff, supported/unsupported routes, map selection, parking details, report submission, persistence, reset, and logout. All primary pages were checked for horizontal overflow at 320, 390, 768, 1024, and 1440 pixels; mobile bottom navigation was exercised. Browser checks used a temporary Playwright installation outside the project, keeping runtime dependencies minimal.
