import { DeadlineItem, Subject, COURSE_CATALOG, CourseLevel } from '@/types/deadline';

// ── GA Week deadlines by level (May 2026 Term) ──
const foundationGAWeeks = [
  { week: 1,  date: '2026-06-24' },
  { week: 2,  date: '2026-07-01' },
  { week: 3,  date: '2026-07-08' },
  { week: 4,  date: '2026-07-15' },
  { week: 5,  date: '2026-07-22' },
  { week: 6,  date: '2026-07-29' },
  { week: 7,  date: '2026-08-05' },
  { week: 8,  date: '2026-08-12' },
  { week: 9,  date: '2026-08-19' },
  { week: 10, date: '2026-08-26' },
  { week: 11, date: '2026-09-02' },
  { week: 12, date: '2026-09-02' },
];

const diplomaDegreeGAWeeks = [
  { week: 1,  date: '2026-06-21' },
  { week: 2,  date: '2026-06-28' },
  { week: 3,  date: '2026-07-05' },
  { week: 4,  date: '2026-07-12' },
  { week: 5,  date: '2026-07-22' },
  { week: 6,  date: '2026-07-26' },
  { week: 7,  date: '2026-08-02' },
  { week: 8,  date: '2026-08-09' },
  { week: 9,  date: '2026-08-19' },
  { week: 10, date: '2026-08-23' },
  { week: 11, date: '2026-08-30' },
  { week: 12, date: '2026-08-30' },
];

function getGAWeeks(level: CourseLevel) {
  return level === 'foundation' ? foundationGAWeeks : diplomaDegreeGAWeeks;
}

const excludedGAWeeksByCourse: Partial<Record<Subject, number[]>> = {
  TDS: [9, 10, 11, 12],
  SC:  [11, 12],
};

// Generate GAs for all theory courses (not projects)
const theoryCourses = COURSE_CATALOG.filter(c => !c.isProject);
const gradedAssignments: DeadlineItem[] = theoryCourses.flatMap(course => {
  const excludedWeeks = excludedGAWeeksByCourse[course.id as Subject] ?? [];
  const weeks = getGAWeeks(course.level).filter(({ week }) => !excludedWeeks.includes(week));
  return weeks.map(({ week, date }) => ({
    id: `ga-${course.id.toLowerCase()}-w${week}`,
    title: `GA Week ${week}`,
    subject: course.id as Subject,
    type: 'ga' as const,
    date,
    priority: 5,
  }));
});

// ── Common exams ──
const commonExams: DeadlineItem[] = [
  { id: 'exam-quiz1',   title: 'Quiz 1',       subject: 'ALL', type: 'quiz',    date: '2026-07-19', priority: 1, description: 'In-person at TCS centres, 2pm-6pm' },
  { id: 'exam-quiz2',   title: 'Quiz 2',       subject: 'ALL', type: 'quiz',    date: '2026-08-16', priority: 1, description: 'In-person at TCS centres, 2pm-6pm' },
  { id: 'exam-endterm', title: 'End Term Exam', subject: 'ALL', type: 'endterm', date: '2026-09-13', priority: 1, description: 'In-person at TCS centres, 9am-12pm & 2pm-5pm' },
];

// ── Course-specific OPPEs ──
const oppeItems: DeadlineItem[] = [
  // Python
  { id: 'python-oppe1', title: 'OPPE 1', subject: 'PYTHON', type: 'oppe', date: '2026-08-01', priority: 1, description: 'Day 1: Aug 1 (standalone), Day 2: Aug 2 (standalone+others)' },
  { id: 'python-oppe2', title: 'OPPE 2', subject: 'PYTHON', type: 'oppe', date: '2026-09-05', priority: 1, description: 'Day 3: Sep 5 (standalone), Day 4: Sep 6' },
  // MLP
  { id: 'mlp-oppe1', title: 'OPPE 1', subject: 'MLP', type: 'oppe', date: '2026-08-01', priority: 1 },
  { id: 'mlp-oppe2', title: 'OPPE 2', subject: 'MLP', type: 'oppe', date: '2026-08-30', priority: 1 },
  // PDSA
  { id: 'pdsa-oppe', title: 'OPPE', subject: 'PDSA', type: 'oppe', date: '2026-08-30', priority: 1, description: 'Single OPPE, 120 min; Sep 6 reattempt slot' },
  // DBMS
  { id: 'dbms-oppe', title: 'OPPE', subject: 'DBMS', type: 'oppe', date: '2026-08-29', priority: 1, description: 'First attempt Aug 29; reattempt Sep 6' },
  // Java
  { id: 'java-oppe1', title: 'OPPE 1', subject: 'JAVA', type: 'oppe', date: '2026-08-02', priority: 1 },
  { id: 'java-oppe2', title: 'OPPE 2', subject: 'JAVA', type: 'oppe', date: '2026-08-30', priority: 1 },
  // SC
  { id: 'sc-oppe',  title: 'OPPE',   subject: 'SC', type: 'oppe', date: '2026-08-29', priority: 1, description: 'Re-OPPE: Sep 5' },
  // C Programming
  { id: 'cprog-oppe1', title: 'OPPE 1', subject: 'C_PROG', type: 'oppe', date: '2026-08-01', priority: 1 },
  { id: 'cprog-oppe2', title: 'OPPE 2', subject: 'C_PROG', type: 'oppe', date: '2026-08-29', priority: 1, description: 'DS students Aug 29; ES students Aug 30' },
  // MLOps
  { id: 'mlops-oppe1', title: 'OPPE 1', subject: 'MLOPS', type: 'oppe', date: '2026-08-02', priority: 1 },
  { id: 'mlops-oppe2', title: 'OPPE 2', subject: 'MLOPS', type: 'oppe', date: '2026-09-06', priority: 1 },
];

// ── MLP Kaggle Assignments ──
const mlpKaggle: DeadlineItem[] = [
  { id: 'mlp-ka1',        title: 'KA1 Submission', subject: 'MLP', type: 'kaggle',        date: '2026-07-22', priority: 4 },
  { id: 'mlp-ka1-review', title: 'KA1 Peer Review', subject: 'MLP', type: 'kaggle_review', date: '2026-07-25', priority: 4 },
  { id: 'mlp-ka2',        title: 'KA2 Submission', subject: 'MLP', type: 'kaggle',        date: '2026-08-04', priority: 4 },
  { id: 'mlp-ka2-review', title: 'KA2 Peer Review', subject: 'MLP', type: 'kaggle_review', date: '2026-08-08', priority: 4 },
  { id: 'mlp-ka3',        title: 'KA3 Submission', subject: 'MLP', type: 'kaggle',        date: '2026-08-18', priority: 4 },
  { id: 'mlp-ka3-review', title: 'KA3 Peer Review', subject: 'MLP', type: 'kaggle_review', date: '2026-08-22', priority: 4 },
];

// ── TDS specific (ROE & Project dates TBD) ──
const tdsItems: DeadlineItem[] = [
  { id: 'tds-roe', title: 'ROE (Remote Online Exam)', subject: 'TDS', type: 'roe',     date: 'YTD', priority: 1, description: '45 min, open internet, 20% weightage' },
  { id: 'tds-p1',  title: 'Project 1',                subject: 'TDS', type: 'project', date: 'YTD', priority: 2, description: '20% weightage, open internet' },
  { id: 'tds-p2',  title: 'Project 2',                subject: 'TDS', type: 'project', date: 'YTD', priority: 2, description: '20% weightage, open internet' },
];

// ── BA Assignments ──
const baItems: DeadlineItem[] = [
  { id: 'ba-a1', title: 'Assignment 1', subject: 'BA', type: 'ga', date: '2026-07-22', priority: 3, description: '10 marks, Week 5' },
  { id: 'ba-a2', title: 'Assignment 2', subject: 'BA', type: 'ga', date: '2026-07-26', priority: 3, description: '10 marks, Week 6' },
  { id: 'ba-a3', title: 'Assignment 3', subject: 'BA', type: 'ga', date: '2026-08-19', priority: 3, description: '10 marks, Week 9' },
];

// ── SC BPTs (exact dates TBD — released Week 3, 5, 7, 10) ──
const scBPTs: DeadlineItem[] = [
  { id: 'sc-bpt1', title: 'BPT 1', subject: 'SC', type: 'bpt', date: 'YTD', priority: 4, description: 'Week 3, 4 questions in VM' },
  { id: 'sc-bpt2', title: 'BPT 2', subject: 'SC', type: 'bpt', date: 'YTD', priority: 4, description: 'Week 5' },
  { id: 'sc-bpt3', title: 'BPT 3', subject: 'SC', type: 'bpt', date: 'YTD', priority: 4, description: 'Week 7' },
  { id: 'sc-bpt4', title: 'BPT 4', subject: 'SC', type: 'bpt', date: 'YTD', priority: 4, description: 'Week 10' },
];

// ── Stats 1 Extra Activities ──
const stats1Extra: DeadlineItem[] = [
  { id: 'stats1-ea1', title: 'Extra Activity 1', subject: 'STATS1', type: 'extra_activity', date: '2026-07-29', priority: 4, description: 'Peer review by Aug 2' },
  { id: 'stats1-ea2', title: 'Extra Activity 2', subject: 'STATS1', type: 'extra_activity', date: '2026-07-29', priority: 4, description: 'Peer review by Aug 2' },
  { id: 'stats1-ea3', title: 'Extra Activity 3', subject: 'STATS1', type: 'extra_activity', date: '2026-08-12', priority: 4, description: 'Peer review by Aug 16' },
  { id: 'stats1-ea4', title: 'Extra Activity 4', subject: 'STATS1', type: 'extra_activity', date: '2026-08-26', priority: 4, description: 'Peer review by Aug 30' },
];

// ── Stats 2 Extra Activities ──
const stats2Extra: DeadlineItem[] = [
  { id: 'stats2-ea1', title: 'Extra Activity 1', subject: 'STATS2', type: 'extra_activity', date: '2026-06-24', priority: 4, description: 'Peer review by Jun 28' },
  { id: 'stats2-ea2', title: 'Extra Activity 2', subject: 'STATS2', type: 'extra_activity', date: '2026-07-08', priority: 4, description: 'Peer review by Jul 12' },
  { id: 'stats2-ea3', title: 'Extra Activity 3', subject: 'STATS2', type: 'extra_activity', date: '2026-07-22', priority: 4, description: 'Peer review by Jul 26' },
  { id: 'stats2-ea4', title: 'Extra Activity 4', subject: 'STATS2', type: 'extra_activity', date: '2026-08-05', priority: 4, description: 'Peer review by Aug 9' },
  { id: 'stats2-ea5', title: 'Extra Activity 5', subject: 'STATS2', type: 'extra_activity', date: '2026-08-19', priority: 4, description: 'Peer review by Aug 23' },
];

// ── Maths 2 Extra Activities ──
const maths2Extra: DeadlineItem[] = [
  { id: 'maths2-ea1', title: 'Extra Activity 1', subject: 'MATHS2', type: 'extra_activity', date: '2026-07-07', priority: 4 },
  { id: 'maths2-ea2', title: 'Extra Activity 2', subject: 'MATHS2', type: 'extra_activity', date: '2026-07-31', priority: 4 },
  { id: 'maths2-ea3', title: 'Extra Activity 3', subject: 'MATHS2', type: 'extra_activity', date: '2026-08-21', priority: 4 },
];

// ── DL GenAI Theory (NPPE dates TBD) ──
const dlGenaiTheoryItems: DeadlineItem[] = [
  { id: 'dlg-nppe1', title: 'NPPE 1', subject: 'DL_GENAI', type: 'nppe', date: 'YTD', priority: 1 },
  { id: 'dlg-nppe2', title: 'NPPE 2', subject: 'DL_GENAI', type: 'nppe', date: 'YTD', priority: 1 },
];

// ── DL GenAI Project milestones ──
const dlGenaiProjItems: DeadlineItem[] = [
  { id: 'dlg-form1',  title: 'Registration Form',             subject: 'DL_GENAI_PROJ', type: 'form',      date: '2026-06-30', priority: 3, description: 'Form 1 — Kaggle, GitHub & W&B setup' },
  { id: 'dlg-form2',  title: 'Report Submission Form',        subject: 'DL_GENAI_PROJ', type: 'form',      date: '2026-07-31', priority: 3 },
  { id: 'dlg-form3',  title: 'Deployment Link Form',          subject: 'DL_GENAI_PROJ', type: 'form',      date: '2026-07-31', priority: 3 },
  { id: 'dlg-m0',    title: 'Milestone 0 — Orientation & Setup',          subject: 'DL_GENAI_PROJ', type: 'milestone', date: '2026-06-10', priority: 3, description: 'Kaggle, GitHub, W&B account setup' },
  { id: 'dlg-m1',    title: 'Milestone 1 — EDA & Baseline',               subject: 'DL_GENAI_PROJ', type: 'milestone', date: '2026-06-17', priority: 3, description: 'EDA, rule-based baseline, Kaggle submission' },
  { id: 'dlg-m2',    title: 'Milestone 2 — Classical ML',                 subject: 'DL_GENAI_PROJ', type: 'milestone', date: '2026-06-24', priority: 3, description: 'MFCCs/Spectrograms, classical models, W&B logging' },
  { id: 'dlg-m3',    title: 'Milestone 3 — First Neural Network & CNNs',  subject: 'DL_GENAI_PROJ', type: 'milestone', date: '2026-07-01', priority: 3, description: 'PyTorch basics, CNN on Mel-Spectrograms' },
  { id: 'dlg-m4',    title: 'Milestone 4 — Sequential Models & CRNNs',    subject: 'DL_GENAI_PROJ', type: 'milestone', date: '2026-07-08', priority: 3, description: 'LSTM/GRU + CNN hybrid models' },
  { id: 'dlg-m5',    title: 'Milestone 5 — Fine-Tuning Transformers',     subject: 'DL_GENAI_PROJ', type: 'milestone', date: '2026-07-15', priority: 3, description: 'AST/HuBERT fine-tuning via Hugging Face' },
  { id: 'dlg-final', title: 'Final Submission & Presentation',            subject: 'DL_GENAI_PROJ', type: 'project',   date: '2026-07-19', priority: 2, description: 'Final Kaggle submission, report, optional deployment' },
  { id: 'dlgproj-cutoff-sep25', title: 'Cross Cutoff Deadline (Sep 2025 theory)', subject: 'DL_GENAI_PROJ', type: 'project', date: '2026-06-30', priority: 1, description: 'Must cross Kaggle cutoff by this date' },
  { id: 'dlgproj-cutoff-jan26', title: 'Cross Cutoff Deadline (Jan/May 2026 theory)', subject: 'DL_GENAI_PROJ', type: 'project', date: '2026-07-15', priority: 1, description: 'Must cross Kaggle cutoff by this date' },
  { id: 'dlgproj-viva-sep25',   title: 'Complete Both Vivas (Sep 2025 theory)',       subject: 'DL_GENAI_PROJ', type: 'project', date: '2026-07-15', priority: 1 },
  { id: 'dlgproj-viva-jan26',   title: 'Complete Both Vivas (Jan/May 2026 theory)',   subject: 'DL_GENAI_PROJ', type: 'project', date: '2026-07-31', priority: 1 },
];

// ── MLP Project milestones ──
const mlpProjItems: DeadlineItem[] = [
  { id: 'mlpproj-reg',    title: 'Registration Deadline',             subject: 'MLP_PROJ', type: 'project',   date: '2026-07-01', priority: 2, description: 'Submit Kaggle notebook link; penalty of 1 mark/week after' },
  { id: 'mlpproj-m1',    title: 'Milestone 1',                       subject: 'MLP_PROJ', type: 'milestone', date: '2026-06-21', priority: 3 },
  { id: 'mlpproj-m2',    title: 'Milestone 2',                       subject: 'MLP_PROJ', type: 'milestone', date: '2026-06-28', priority: 3 },
  { id: 'mlpproj-m3',    title: 'Milestone 3',                       subject: 'MLP_PROJ', type: 'milestone', date: '2026-07-05', priority: 3 },
  { id: 'mlpproj-m4',    title: 'Milestone 4',                       subject: 'MLP_PROJ', type: 'milestone', date: '2026-07-12', priority: 3 },
  { id: 'mlpproj-m5',    title: 'Milestone 5',                       subject: 'MLP_PROJ', type: 'milestone', date: '2026-07-21', priority: 2 },
  { id: 'mlpproj-cutoff-sep25', title: 'Cross Cutoff Deadline (Sep 2025 & earlier)', subject: 'MLP_PROJ', type: 'project', date: '2026-07-12', priority: 1, description: 'Kaggle competition deadline: Jul 31' },
  { id: 'mlpproj-cutoff-jan26', title: 'Cross Cutoff Deadline (Jan/May 2026)',       subject: 'MLP_PROJ', type: 'project', date: '2026-07-21', priority: 1, description: 'Kaggle competition deadline: Jul 31' },
  { id: 'mlpproj-kaggle', title: 'Kaggle Competition Deadline',      subject: 'MLP_PROJ', type: 'project',   date: '2026-07-31', priority: 1 },
  { id: 'mlpproj-viva-sep25', title: 'Complete Both Vivas (Sep 2025 & earlier)', subject: 'MLP_PROJ', type: 'project', date: '2026-07-31', priority: 1 },
  { id: 'mlpproj-viva-jan26', title: 'Complete Both Vivas (Jan/May 2026)',       subject: 'MLP_PROJ', type: 'project', date: '2026-08-23', priority: 1 },
];

// ── MAD1 Project ──
const mad1ProjItems: DeadlineItem[] = [
  { id: 'mad1proj-sub1', title: 'Project Submission (May 2025 or earlier)', subject: 'MAD1_PROJ', type: 'project', date: '2026-07-14', priority: 2, description: 'Evaluated out of 100' },
  { id: 'mad1proj-sub2', title: 'Project Submission (Sep/Jan 2026)',        subject: 'MAD1_PROJ', type: 'project', date: '2026-08-09', priority: 2, description: 'For May 2026 theory students; evaluated out of 105, capped to 100' },
];

// ── MAD2 Project ──
const mad2ProjItems: DeadlineItem[] = [
  { id: 'mad2proj-sub1', title: 'Project Submission (May 2025 or earlier)', subject: 'MAD2_PROJ', type: 'project', date: '2026-07-14', priority: 2, description: 'Evaluated out of 100' },
  { id: 'mad2proj-sub2', title: 'Project Submission (Sep/Jan 2026)',        subject: 'MAD2_PROJ', type: 'project', date: '2026-08-09', priority: 2, description: 'For May 2026 theory students; evaluated out of 105, capped to 100' },
];

// ── SE Milestones ──
const seItems: DeadlineItem[] = [
  { id: 'se-m1', title: 'Milestone 1',            subject: 'SE', type: 'milestone', date: '2026-06-28', priority: 3 },
  { id: 'se-m2', title: 'Milestone 2',            subject: 'SE', type: 'milestone', date: '2026-07-22', priority: 3 },
  { id: 'se-m3', title: 'Milestone 3 (Sprint 1)', subject: 'SE', type: 'milestone', date: '2026-08-02', priority: 3, description: 'Peer review by Aug 27' },
  { id: 'se-m4', title: 'Milestone 4 (Sprint 2)', subject: 'SE', type: 'milestone', date: '2026-08-12', priority: 3 },
  { id: 'se-m5', title: 'Milestone 5',            subject: 'SE', type: 'milestone', date: '2026-08-23', priority: 3 },
];

// ── SPG (Strategies for Professional Growth) Project ──
const spgItems: DeadlineItem[] = [
  { id: 'spg-m1', title: 'Group Project Milestone I',  subject: 'SPG', type: 'milestone', date: '2026-07-05', priority: 3, description: 'Week 1–3, 50 marks — end of Week 3' },
  { id: 'spg-m2', title: 'Group Project Milestone II', subject: 'SPG', type: 'milestone', date: '2026-07-26', priority: 3, description: 'Week 4–6, 50 marks — end of Week 6' },
];

export const ALL_DEADLINES: DeadlineItem[] = [
  ...gradedAssignments,
  ...commonExams,
  ...oppeItems,
  ...mlpKaggle,
  ...tdsItems,
  ...baItems,
  ...scBPTs,
  ...stats1Extra,
  ...stats2Extra,
  ...maths2Extra,
  ...dlGenaiTheoryItems,
  ...dlGenaiProjItems,
  ...mlpProjItems,
  ...mad1ProjItems,
  ...mad2ProjItems,
  ...seItems,
  ...spgItems,
].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());