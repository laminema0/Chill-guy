# Chill Guy: V1 app (Expo + React Native)

## What this is
A real mobile version of Chill Guy, an anger management app designed as Amin's MA thesis (Social Design, SRH Berlin). V1 helps people calm down in the moment and understand why their anger comes back. It is a **self-help and reflection tool, not therapy**: the app never diagnoses, treats or promises outcomes.

Full spec (source of truth for product decisions): https://claude.ai/code/artifact/5f19e420-bb13-4278-befa-f8f5c5c73732

## About the developer
Amin is a designer with limited coding experience (HTML/CSS plus general understanding). So:
- Explain what you did in plain words after each task, briefly.
- Keep code simple and readable over clever.
- Work in small steps. After each step, tell Amin how to test it on his phone with Expo Go.
- Ask before adding any library not listed below.

## Design source
- Figma file key: `f3OmSGrAC7YBQVRNW2Hvj8` (read it through the Figma connector)
- Design System page: node `2187:1594` (51 variables in 5 collections: Primitives, Color, Spacing, Radius, Size; 9 Rubik text styles; Elevation/Card effect; 8 components)
- Final Journey screens: section `2028:4623` (the latest screen designs)
- Never hardcode colours or sizes in screens. Everything comes from `theme/tokens.ts`.

Key tokens: brand #1F81A8, active #2E8FA3, navy text #1F4152, body #404040, muted #8C8C8C, surface-subtle #DFEDF5, muted surface #F0F3F5, danger #B6484A. Primary button h52 r22, input h49, chip h29, bottom nav h68. Font: Rubik.

Components to build: Button (3 types x 3 states), Input (4 states), Chip (2), Card (2), Avatar (2), NavItem (2), BottomNav, Rating, plus nav icons (Home, Breathe 3-wave, Specialists, ChatBubble) as SVG.

## Stack
Expo + React Native, TypeScript, latest stable Expo SDK.
- Navigation: Expo Router
- Database: expo-sqlite (local only)
- State: Zustand
- Notifications: expo-notifications (local only)
- Animation: react-native-reanimated + react-native-svg
- Also: expo-haptics, expo-keep-awake, expo-local-authentication, expo-font, expo-file-system, expo-sharing

## Folder structure
```
app/         screens (Expo Router)
components/  design system components
theme/       tokens.ts
db/          schema, migrations, queries
store/       Zustand stores
features/    checkin, breathe, plans, revisit
lib/         notifications, export, safety content
```

## V1 scope
In: Granular Check-in, Breathe, My If-Then Plan, Cool-Down Revisit, onboarding, Get help screen, settings (export and delete data, optional app lock).
Out for now: My Anger Story, Journey Chapters, Repair and Express, AI chat (hide the Chat FAB), therapist booking, wearable, accounts, cloud, analytics.

Bottom nav: Home, Breathe, Plans, History.

## Hard rules
- All data stays on the device. No servers, no accounts, no analytics SDKs.
- A "Get help now" screen is reachable in one tap from every screen: 112 and TelefonSeelsorge 0800 111 0 111 / 0800 111 0 222, tap to call.
- App text: no blame, no "you should", no clinical claims or promises.

## Data model (SQLite, keep a schema version from day one)
- checkins: id, created_at, intensity (0-10), trigger_who, trigger_where, note, body_signals, self_talk, breathe_used, plan_id
- plans: id, created_at, if_text, then_text, source_checkin_id, pinned, times_used, last_used_at
- revisits: id, checkin_id, scheduled_for, completed_at, intensity_now, answer_view, answer_need, answer_different, new_plan_id
- breathe_sessions: id, started_at, duration_sec, feeling_before, feeling_after

## Roadmap (one milestone at a time)
1. Setup and tokens: app runs on phone with Rubik and tokens.ts  <- START HERE
2. Component library on one test screen, matching Figma
3. Navigation, onboarding, Get help screen
4. Breathe (4s in, 6s out, 2 min, wave animation, haptics, after rating, screen stays awake)
5. Check-in + database (3 steps, under 60 seconds, saves and shows in History)
6. If-Then Plans (create, edit, pin to Home, "used it" counter, create from check-in)
7. Cool-Down Revisit (local notification 2-3 days after a check-in with intensity 5+, 3 reflection questions, re-rate intensity)
8. Settings, export, delete, app lock, polish

## Progress log
Update this section at the end of each session with what was finished and what is next.
- 2026-09-22, Milestone 1 done: Expo SDK 57 app with Expo Router, TypeScript, Rubik (Regular/Medium/Bold bundled in `assets/fonts`), `theme/tokens.ts` built from the Figma variables, text styles and card shadow, and a test screen at `app/index.tsx` showing every text style and colour. Note: `size.chip` (29) is from this spec, not a Figma variable yet.
- 2026-09-22, Milestone 2 done: `components/` has Button, Input, Chip, Card, Avatar, Rating, NavItem, BottomNav and the nav icons (react-native-svg, paths copied from the Figma export). Test screen at `app/index.tsx`; the tokens screen moved to `app/tokens.tsx`. `react-dom` pinned to 19.2.3 to fix an npm peer clash from expo-router. Tokens added that are not Figma styles/variables yet: chip height 30 (Figma component, replaces 29), avatarSm 32, text buttonLabel/cardTitle/cardBody/fabLabel.
- Plans (clipboard + check) and History (clock + back arrow) icons were drawn in code to match the Figma icon style, since Figma has none yet. V1 tab bar shown on the test screen.
- 2026-09-23, Clickable prototype of the V1 Figma screens (Amin asked to see the real app, exactly like Figma, before features work). Decisions by Amin: V1 screens only; use the Figma bottom nav (Home, Breathe, Specialists + Chat button) instead of Home/Breathe/Plans/History. Specialists and Chat open a "Coming later" screen, as does anything else outside V1 (Journey chapters, Talk it out, Heart rate, Notifications, full story). Built: Home, Breathe (still), Check-in, My Story (Pattern + Logs), My Plan, Settings (from the avatar on Home), all with example content from Figma. The design system test screens moved to `app/dev/` (reached from Settings, "Design system (dev)"). New tokens under `color.extra`, `radius.card/quickLink/navBar/navItem`, `layout`, and screen text styles are values from the screens that are not Figma variables or text styles yet.
- Known gaps: "Get help now" is not in Figma and is not on the screens yet (hard rule, do it in Milestone 3). Home uses an initial instead of the stock profile photo. Intro/onboarding screens not built yet. Plans/History icons exist but are not used by the current nav.
- Next: intro screens (V1 subset: Intro 01, 02, 03, 06, 07, 08, 10), then Milestone 3 (Get help screen, onboarding flow, navigation polish).

## Expo notes
See `AGENTS.md` for Expo commands and rules (use `npx expo install`, never trust old Expo APIs from memory).
