

# Deadline Intelligence System — Implementation Plan

## Overview
A high-signal, dark-mode-first academic command center that provides urgency-aware deadline tracking, risk detection, and execution analytics for the Jan 2026 term across MLP, DL GenAI, and TDS subjects. All data persisted in localStorage — no backend needed.

---

## Phase 1: Core Foundation & Data Layer

### Data Architecture
- Pre-loaded deadline database with all provided dates structured as typed entities: **Deadlines** (graded assignments), **Exams** (Quiz 1/2, Final), **Milestones** (project-specific), and **Tasks** (Kaggle assignments, forms)
- Each item has: subject, type, deadline date, status (pending/completed/overdue), priority tier, and optional notes
- LocalStorage persistence for completion states, streaks, and user preferences
- Auto-computed fields: days remaining, urgency zone (red ≤5, orange ≤10, green >10), overdue flag

### Subject Configuration
- **MLP**: 12 weekly GAs + 5 project milestones + OPPE1/OPPE2 + 3 Kaggle assignments with peer review deadlines
- **DL GenAI**: 12 weekly GAs + 5 project milestones + final submission + 3 forms (registration, report, deployment link)
- **TDS**: 12 weekly GAs + Project 1 + Project 2 + ROE

---

## Phase 2: Command Center (Main Dashboard)

### Hero Countdown
- Large, prominent countdown to the nearest critical event with pulsing animation when ≤3 days
- Shows event name, subject, and exact date/time remaining

### Urgency Zones
- **Red Zone (≤5 days)**: Items with bold red accent, sorted by nearest deadline
- **Orange Zone (≤10 days)**: Warning-level items
- **Upcoming (next 7 days)**: Clean list of everything approaching

### Weekly Stats Bar
- Completed this week count
- Completion rate percentage
- Current streak (consecutive days without a miss)
- "At Risk" badge if 3+ items due within 7 days

### Overdue Section
- Any missed items shown with stark visual treatment and days overdue count

---

## Phase 3: Timeline View

### Horizontal Academic Timeline (Feb → May 2026)
- Scrollable timeline with month markers
- Exam dates as tall, highlighted pillars
- Weekly GA deadlines shown as repeating markers across all 3 subjects
- Project milestones as distinct markers per subject
- **Cluster detection**: Visual density indicator when 3+ items fall within a 3-day window — highlighted as "crunch zones"
- Color-coded by subject (MLP, DL GenAI, TDS each get a distinct muted color)

---

## Phase 4: Subject View

### Per-Subject Dashboard Cards
- **Progress bar**: Completed items / total items
- **Upcoming milestones**: Next 3 items with days remaining
- **Completed items**: Collapsible list of finished work
- **Risk indicator**: Red/yellow/green based on upcoming density and completion rate
- Specific sections for project milestones, Kaggle assignments (MLP), forms (DL GenAI), and projects (TDS)

---

## Phase 5: Smart Tracking Features

### Core Interactions
- Manual completion toggle on every item (checkbox with satisfying state change)
- Auto-sort by urgency across all views
- Deadline color-coding consistent throughout the app
- Days-left counter on every item

### Intelligence Layer
- **At Risk detection**: Flags when too many items cluster within 7 days
- **Weekly performance summary**: Accessible from dashboard — shows completion rate, items done, items missed
- **Streak counter**: Tracks consecutive days without missing a deadline
- **Weighted priority scoring**: Exams > OPPEs > Project submissions > Weekly GAs

---

## Phase 6: Behavioral Design Layer

### Urgency Escalation
- Items visually intensify as deadlines approach (subtle → bold → pulsing)
- Background color shifts on cards nearing deadline

### Daily Review Prompt
- On first visit each day, a brief modal showing today's priorities and items due within 48 hours

### Sunday Planning Ritual
- Special weekly planning view available on Sundays showing the full week ahead, suggested focus areas, and a review of last week's performance

---

## Design System

### Visual Identity
- **Dark mode default** with optional light mode toggle
- Strong typographic hierarchy: large countdown numbers, medium headers, compact list items
- Muted subject colors: Steel blue (MLP), Amber (DL GenAI), Emerald (TDS)
- Minimal use of color — only for urgency zones and subject identification
- No emojis, no gamification, no clutter
- Data-first: every pixel conveys information

### Navigation
- Sidebar with 4 views: Command Center, Timeline, Subjects, Settings
- Clean, icon-driven when collapsed

---

## Pages & Routes
1. **/** — Command Center (main dashboard)
2. **/timeline** — Horizontal academic timeline
3. **/subjects** — Subject-specific views (with sub-navigation for MLP, DL GenAI, TDS)
4. **/settings** — Theme toggle, data reset, streak settings

