# Stele — Sovereign Institutional Operating System & Student Commitment Ledger

> **"A quiet, federated institutional layer where student contributions are witnessed by named humans, deadlines are governed strictly by the mathematical clock, and institutional memory outlives every graduating cohort."**  
> *Aligned with the Consolidated White Paper & Product Requirements Document (v2.1)*

---

## ⚡ One-Click Interactive Local Setup

Stele is engineered as an **offline-first, zero-configuration web application**. No external database keys or cloud credentials are required to run the full multi-role institutional node locally.

### Option A: Single-Line Interactive Terminal Bootstrap (macOS / Linux / WSL / Git Bash)

Copy and paste this single command into your terminal to clone, verify your runtime (`bun` or `npm`), configure `.env`, install dependencies, and launch the interactive menu:

```bash
git clone https://github.com/YOUR_USERNAME/stele.git && cd stele && bash ./setup.sh
```

*(Already cloned the repository? Run the interactive launcher directly:)*

```bash
npm run setup
```

### Option B: Direct Package Manager Commands (Cross-Platform: Windows / macOS / Linux)

Whether you prefer **npm** or **Bun** (`bun.lock` is included), Stele boots cleanly on port `3000`:

| Action | Using `npm` | Using `bun` |
| :--- | :--- | :--- |
| **1. Install Dependencies** | `npm install` | `bun install` |
| **2. Start Dev Server (`:3000`)** | `npm run dev` | `bun run dev` |
| **3. Type-Check (`tsc`)** | `npm run lint` | `bun run lint` |
| **4. Production Build (`dist/`)** | `npm run build` | `bun run build` |
| **5. Preview Production Build** | `npm run preview` | `bun run preview` |

### Option C: One-Click Cloud IDE Launch

Want to inspect or demo Stele in the browser with zero local installation? Replace `YOUR_USERNAME/stele` with your GitHub repository path:

- **[Open in StackBlitz](https://stackblitz.com/github/YOUR_USERNAME/stele)** — Instant WebContainer boot on port 3000
- **[Open in GitHub Codespaces](https://codespaces.new/YOUR_USERNAME/stele)** — Full containerized VS Code environment

---

## 🏛️ Architectural Philosophy & Constitutional Invariants

Stele replaces fragmented WhatsApp groups, ephemeral social feeds, and high-surveillance academic portals with **Three Sovereign Planes**:

1. **The Institutional Plane (Private & Sovereign):** Houses internal club operations, laboratory logbooks, succession handovers, and the closed-loop Civic Economy. Grades, attendance, and disciplinary marks are **permanently barred** by constitutional firewall.
2. **The Federation Plane (Inter-School Opportunity Wire):** Carries verified olympiads, grants, and fellowships across District, Division, National, and International scopes without ever leaking internal student telemetry across the wire.
3. **The Student Plane (A Table of Contents, Never a Feed):**
   - **Clock-Driven Urgency (`PRD §15`):** No authority or steward can manually colour an announcement red. Only items with `<24h` remaining turn critical orange/red; missed items become quiet dashed lines—never public shame markers.
   - **Scope-First, Deadline-Second Sorting (`WP §6`):** No popularity ranking, no algorithmic boosting, no infinite scroll. The student is the algorithm.
   - **Earned Motion Protocol (`WP §7`):** Zero unsolicited pulsing or shaking on items the student has not engaged with. Motion is strictly an earned physical response to touch.

---

## 🎨 The Three-Material Design System (`Clay · Glass · Flat`)

Every screen in Stele obeys a strict tactile hierarchy designed to run smoothly even on low-end student hardware:

- **Clay (`NavBar`, `DesktopSidebar`, Primary Controls):** Tactile, extruded matte surfaces with top specular catchlights and physical spring compression (`cubic-bezier(0.34, 1.56, 0.64, 1)`).
  - **2-Tap Unrolling Ribbon:** Tapping any navigation icon (`Home`, `Radar`, `Board`, `Campus`) unrolls a contextual quick-access ribbon upward. Tapping an adjacent icon reverses the first ribbon down before unrolling the next. Tapping the active icon a second time opens the dedicated view.
- **Glass (`Sheets`, `Modals`, `Quick Drawers`):** Translucent overlays (`backdrop-filter: blur(28px) saturate(190%)`) that float above the current context so the student never loses spatial orientation.
- **Flat (`Bento Tiles`, `Data Fields`, `Timetables`):** High-contrast, zero-clutter surfaces using inline middle-dot (`·`) typographic separators and hairline rules (`var(--rule-default)`).

---

## 👥 Interactive 8-Role Calibration & Simulation

You can hot-swap between **all 8 institutional personas** in real time via **Role Calibration & Settings** (accessible from the bottom of any navigation ribbon or sidebar). Each role has its own isolated commitment board, sovereign ledger, and exclusive workspace console:

| Tier | Persona / Role | Exclusive Workspace & Capabilities |
| :--- | :--- | :--- |
| **Tier 1** | **Dweller** *(Observer)* | Zero-pressure observation deck; browse public schedules and notices with zero notification pings. |
| **Tier 1.5** | **Aspirant** *(Trialist)* | Claim beginner-scoped club trial tasks to earn verified progress toward full membership. |
| **Tier 2** | **General Member** | Commit to club tasks, sync academic & club schedules, and redeem points in the **Physical Perks Bazaar**. |
| **Tier 2.5** | **Loyal Core** | Lead fabrication shifts and inscribe **2-Minute Retrospectives** into the permanent Club Wiki. |
| **Tier 3** | **Club Steward** | **Steward Console (6 Tabs):** Delegate tasks, curate bot forwards, audit **DC-1/DC-2 Fairness Telemetry**, and register **Zero-Empty-Seat Succession**. |
| **Tier 4** | **Teacher** *(Faculty)* | **Teacher Console:** Cryptographically countersign student lab logbooks, publish syllabus addenda, and audit section reach. |
| **Tier 5** | **Authority** *(Principal)* | **Authority Console:** Promulgate node-wide circulars, ratify club charters, and verify the Anti-Surveillance Firewall. |
| **Tier 6** | **Alumni** *(Fellow)* | Read-only sovereign archive access, regional proposal mentorship, and portable cryptographic JSON ledger export. |

---

## 🧭 Core Interactive Walkthrough (For Evaluators & Judges)

1. **Home Bento Table-of-Contents:**
   - Double-tap (or click `2x`) on the **7-Day Week Strip** to open the **Unified In-App Calendar** (merging Academic Almanac, Personal Commitments, and Opportunity Deadlines with `.ics` export).
   - Tap the **Wide Check Tile** to sign an official compliance slip (`+20 pts`) or tap **Recent Notices / Closing Soon** in the Home quick-access ribbon to inspect circulars and urgent queues.
2. **2-Minute Retrospective & Celebration Circuit (`Board View`):**
   - Open **Board**, mark an active commitment as complete, and experience the celebratory **Sovereign Milestone Overlay** followed by the skippable **2-Minute Knowledge Capture** modal that appends your notes directly to the Club Wiki.
3. **Closed-Loop Civic Economy vs. Cryptographic Ledger:**
   - Open your **Profile & Perks** to inspect the **Rule of Two Rewards (`WP §18`)**: your rolling 90-day consistency score (exchangeable for physical campus perks like Foundry Café coffee or 3D printer slots) is strictly separated from your permanent, exportable **Sovereign Ledger** (`Ed25519` signed JSON pack).
4. **Viewport Adaptation (`Mobile Frame` ↔ `Expanded Desktop`):**
   - Toggle seamlessly between the **Reference Mobile Device Simulator (`390×844` with Dynamic Island feedback)** and the **Full-Screen Responsive Desktop Workspace** using the frame toggle in the sidebar or settings sheet.

---

## 📂 Project Structure

```text
├── setup.sh                        # Interactive 1-click terminal setup & launcher
├── index.html                      # Entry HTML with Plus Jakarta Sans, Instrument Serif & JetBrains Mono
├── src/
│   ├── App.tsx                     # Root state engine, 2-tap ribbon router & role-isolated storage
│   ├── index.css                   # Three-Material CSS tokens, 5 Natural Palettes & responsive rules
│   ├── types.ts                    # Strict TypeScript definitions for all planes & roles
│   ├── data/
│   │   ├── originOfStele.ts        # Full embedded White Paper & PRD v2.1 Markdown document
│   │   ├── roleProfiles.ts         # Calibrated personas, commitments & bento configs for all 8 roles
│   │   ├── mockData.ts             # Federated items, clubs, wikis, dispatches & physical perks
│   │   └── academicCalendarData.ts # Almanac fixtures, quiet zones & syllabus revision streams
│   ├── views/
│   │   ├── HomeView.tsx            # Role-calibrated Bento grid & preview tiles
│   │   ├── RadarView.tsx           # Scope-first, deadline-second federated opportunity feed
│   │   ├── BoardView.tsx           # Active/Watched/Past commitments & role consoles
│   │   ├── CampusView.tsx          # Club directory, timetable, syllabi & quiet zones
│   │   ├── DispatchesView.tsx      # Scoped distraction-free campus messenger
│   │   └── PerksBazaarView.tsx     # Physical campus utility redemption bazaar
│   └── components/                 # Modular Clay, Glass & Flat UI components
```

---

## 🤝 Disclosure & Attribution

Architected and refined in collaboration with **Google AI Studio Build**, translating the **Stele White Paper & Product Requirements Document (v2.1)** into a tactile, interactive reference implementation.
