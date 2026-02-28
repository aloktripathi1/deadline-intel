<div align="center">

# Deadline Intel

**Never miss a deadline again.**

A sleek, personalised deadline dashboard built by an IIT Madras BS student, for IIT Madras BS students.

Track GAs, Quizzes, OPPEs, NPPEs, Kaggle submissions, project milestones and more — all in one place.

[![GitHub stars](https://img.shields.io/github/stars/aloktripathi1/deadline-intel?style=social)](https://github.com/aloktripathi1/deadline-intel)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with React](https://img.shields.io/badge/Built_with-React_19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## Features

### Dashboard
- **Term progress bar** — visual indicator of how far you are through the Jan 2026 semester (Jan 13 – May 10)
- **Next critical deadline** — highlighted front and centre with a countdown
- **Urgency zones** — deadlines grouped by red (≤ 5 days), orange (≤ 10 days), and overdue
- **Theory / Projects filter** — toggle between theory assessments and project milestones
- **Stats at a glance** — pending count, weekly completions, completion rate, and day streak

### Subjects
- **Per-course progress cards** — see completion percentage, upcoming items, and risk level for every course
- **Foundation / Diploma / Degree** sections with colour-coded badges 
- **Collapsible completed items** — keep the view clean

### Timeline
- **Horizontal Gantt-style view** — see all deadlines mapped across Feb–May
- **Cluster detection** — highlights weeks with 3+ overlapping deadlines so you can plan ahead
- **Today marker** — always know where you stand

### Settings
- **Course selector** — pick only the courses you're enrolled in (Foundation, Diploma, Degree)
- **Browser notifications** — opt-in deadline reminders with configurable lead time (1h – 48h)
- **Dark / Light mode** — polished themes with glassmorphism cards
- **Reset data** — clear completions and start fresh

### Notifications
- **Smart reminders** — browser push notifications fire before each deadline based on your chosen lead time
- **Non-intrusive** — only triggers for pending (uncompleted) items

---

## Course Coverage (Jan 2026 Term)

| Level | Courses |
|---|---|
| **Foundation** | Maths 1 & 2, English 1 & 2, CT, Stats 1 & 2, Python |
| **Diploma** | MLF, MLT, MLP, BDM, BA, TDS, PDSA, DBMS, MAD 1 & 2, Java, SC, DL GenAI |
| **Diploma Projects** | MLP Project, BDM Project, MAD 1 & 2 Projects, DL GenAI Project |
| **Degree** | ST, SE, DL, AI Search, SPG, Big Data, C Prog, DL CV, LLM, DLP, Industry 4.0, OS, RL, Corp Fin, Comp Net, MLOps, and more |

**Deadline types tracked:** Graded Assignments (weekly), Quiz 1 & 2, End Term, OPPEs, NPPEs, ROE, Kaggle assignments & peer reviews, project milestones, BPTs, Extra Activities, forms, and course-specific items.

---

## Quick Start

```bash
# Clone
git clone https://github.com/aloktripathi1/deadline-intel.git
cd deadline-intel

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — select your courses and go.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 + TypeScript 5.6 |
| **Build** | Vite |
| **Styling** | Tailwind CSS 4 + shadcn/ui |
| **Routing** | React Router v7 |
| **Fonts** | Plus Jakarta Sans, DM Sans, JetBrains Mono |
| **Testing** | Vitest |
| **Notifications** | Browser Notifications API |
| **Storage** | LocalStorage (zero backend, fully client-side) |

---

## Project Structure

```
src/
├── components/       # UI components (DeadlineRow, NavLink, layout, shadcn/ui)
├── data/             # All deadline data (deadlines.ts)
├── hooks/            # Custom hooks (deadlines, notifications, mobile, toast)
├── lib/              # Utility functions
├── pages/            # Route pages (Dashboard, Timeline, Subjects, Settings, About)
├── test/             # Test setup and specs
└── types/            # TypeScript types & course catalog
```

---

## How It Works

1. **First visit** — a welcome screen prompts you to select your enrolled courses
2. **Dashboard** — instantly shows all upcoming deadlines filtered to your courses, sorted by urgency
3. **Completion tracking** — check off deadlines as you finish them; progress is saved to LocalStorage
4. **No account needed** — everything runs client-side in your browser with zero data sent anywhere

---

## Contributing

Contributions, bug reports, and feature requests are welcome! Feel free to open an issue or submit a PR.

1. Fork the repo
2. Create your branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m 'Add my feature'`)
4. Push (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## Author

**Alok Tripathi** — Data Science undergrad at IIT Madras · AI/ML & Backend Engineering

- GitHub: [@aloktripathi1](https://github.com/aloktripathi1)

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**If Deadline Intel helped you survive the semester, drop a ⭐ on the repo!**

</div>
