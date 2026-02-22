import { DeadlineItem, Subject, COURSE_CATALOG, CourseLevel } from '@/types/deadline';

// ── GA Week deadlines by level ──
const foundationGAWeeks = [
  { week: 1, date: '2026-02-18' },
  { week: 2, date: '2026-02-25' },
  { week: 3, date: '2026-03-04' },
  { week: 4, date: '2026-03-11' },
  { week: 5, date: '2026-03-20' },
  { week: 6, date: '2026-03-25' },
  { week: 7, date: '2026-04-01' },
  { week: 8, date: '2026-04-08' },
  { week: 9, date: '2026-04-17' },
  { week: 10, date: '2026-04-22' },
  { week: 11, date: '2026-04-29' },
  { week: 12, date: '2026-04-29' },
];

const diplomaDegreeGAWeeks = [
  { week: 1, date: '2026-02-15' },
  { week: 2, date: '2026-02-22' },
  { week: 3, date: '2026-03-01' },
  { week: 4, date: '2026-03-08' },
  { week: 5, date: '2026-03-20' },
  { week: 6, date: '2026-03-22' },
  { week: 7, date: '2026-03-29' },
  { week: 8, date: '2026-04-08' },
  { week: 9, date: '2026-04-15' },
  { week: 10, date: '2026-04-19' },
  { week: 11, date: '2026-05-03' },
  { week: 12, date: '2026-05-03' },
];

function getGAWeeks(level: CourseLevel) {
  return level === 'foundation' ? foundationGAWeeks : diplomaDegreeGAWeeks;
}

// Generate GAs for all theory courses (not projects)
const theoryCourses = COURSE_CATALOG.filter(c => !c.isProject);
const gradedAssignments: DeadlineItem[] = theoryCourses.flatMap(course => {
  const weeks = getGAWeeks(course.level);
  return weeks.map(({ week, date }) => ({
    id: `ga-${course.id.toLowerCase()}-w${week}`,
    title: `GA Week ${week}`,
    subject: course.id as Subject,
    type: 'ga' as const,
    date,
    priority: 5,
  }));
});

// ── Common exams (Quiz 1, Quiz 2, End Term) ──
// These apply to ALL registered courses (shown as ALL)
const commonExams: DeadlineItem[] = [
  { id: 'exam-quiz1', title: 'Quiz 1', subject: 'ALL', type: 'quiz', date: '2026-03-15', priority: 1, description: 'In-person at TCS centres, 2pm-6pm' },
  { id: 'exam-quiz2', title: 'Quiz 2', subject: 'ALL', type: 'quiz', date: '2026-04-12', priority: 1, description: 'In-person at TCS centres, 2pm-6pm' },
  { id: 'exam-endterm', title: 'End Term Exam', subject: 'ALL', type: 'endterm', date: '2026-05-10', priority: 1, description: 'In-person at TCS centres, 9am-12pm & 2pm-5pm' },
];

// ── Course-specific OPPEs ──
const oppeItems: DeadlineItem[] = [
  // Python
  { id: 'python-oppe1', title: 'OPPE 1', subject: 'PYTHON', type: 'oppe', date: '2026-04-04', priority: 1, description: 'Day 1: Apr 4, Day 2: Apr 5' },
  { id: 'python-oppe2', title: 'OPPE 2', subject: 'PYTHON', type: 'oppe', date: '2026-05-02', priority: 1, description: 'Day 3: May 2, Day 4: May 3' },
  // MLP
  { id: 'mlp-oppe1', title: 'OPPE 1', subject: 'MLP', type: 'oppe', date: '2026-04-04', priority: 1 },
  { id: 'mlp-oppe2', title: 'OPPE 2', subject: 'MLP', type: 'oppe', date: '2026-04-26', priority: 1 },
  // PDSA
  { id: 'pdsa-oppe', title: 'OPPE', subject: 'PDSA', type: 'oppe', date: '2026-04-26', priority: 1, description: 'Single OPPE, 120 min' },
  // DBMS
  { id: 'dbms-oppe', title: 'OPPE', subject: 'DBMS', type: 'oppe', date: '2026-04-26', priority: 1, description: 'First attempt; reattempt May 3' },
  // Java
  { id: 'java-oppe1', title: 'OPPE 1', subject: 'JAVA', type: 'oppe', date: '2026-04-05', priority: 1 },
  { id: 'java-oppe2', title: 'OPPE 2', subject: 'JAVA', type: 'oppe', date: '2026-05-03', priority: 1 },
  // SC
  { id: 'sc-oppe', title: 'OPPE', subject: 'SC', type: 'oppe', date: '2026-04-25', priority: 1, description: 'Re-OPPE: May 2' },
  // C Programming
  { id: 'cprog-oppe1', title: 'OPPE 1', subject: 'C_PROG', type: 'oppe', date: '2026-04-04', priority: 1 },
  { id: 'cprog-oppe2', title: 'OPPE 2', subject: 'C_PROG', type: 'oppe', date: '2026-04-26', priority: 1 },
  // Big Data
  { id: 'bigdata-oppe1', title: 'OPPE 1', subject: 'BIG_DATA', type: 'oppe', date: '2026-04-05', priority: 1 },
  { id: 'bigdata-oppe2', title: 'OPPE 2', subject: 'BIG_DATA', type: 'oppe', date: '2026-04-26', priority: 1, description: '2pm-6pm' },
  // MLOps
  { id: 'mlops-oppe1', title: 'OPPE 1', subject: 'MLOPS', type: 'oppe', date: '2026-04-05', priority: 1 },
  { id: 'mlops-oppe2', title: 'OPPE 2', subject: 'MLOPS', type: 'oppe', date: '2026-05-03', priority: 1 },
];

// ── MLP Kaggle Assignments ──
const mlpKaggle: DeadlineItem[] = [
  { id: 'mlp-ka1', title: 'KA1 Submission', subject: 'MLP', type: 'kaggle', date: '2026-03-18', priority: 4 },
  { id: 'mlp-ka1-review', title: 'KA1 Peer Review', subject: 'MLP', type: 'kaggle_review', date: '2026-03-22', priority: 4 },
  { id: 'mlp-ka2', title: 'KA2 Submission', subject: 'MLP', type: 'kaggle', date: '2026-04-02', priority: 4 },
  { id: 'mlp-ka2-review', title: 'KA2 Peer Review', subject: 'MLP', type: 'kaggle_review', date: '2026-04-06', priority: 4 },
  { id: 'mlp-ka3', title: 'KA3 Submission', subject: 'MLP', type: 'kaggle', date: '2026-04-17', priority: 4 },
  { id: 'mlp-ka3-review', title: 'KA3 Peer Review', subject: 'MLP', type: 'kaggle_review', date: '2026-04-21', priority: 4 },
];

// ── TDS specific ──
const tdsItems: DeadlineItem[] = [
  { id: 'tds-roe', title: 'ROE (Remote Online Exam)', subject: 'TDS', type: 'roe', date: '2026-04-05', priority: 1, description: '45 min, open internet, 20% weightage' },
  { id: 'tds-p1', title: 'Project 1', subject: 'TDS', type: 'project', date: '2026-03-30', priority: 2, description: '20% weightage, open internet' },
  { id: 'tds-p2', title: 'Project 2', subject: 'TDS', type: 'project', date: '2026-04-13', priority: 2, description: '20% weightage, open internet' },
];

// ── BA Assignments ──
const baItems: DeadlineItem[] = [
  { id: 'ba-a1', title: 'Assignment 1', subject: 'BA', type: 'ga', date: '2026-03-20', priority: 3, description: '10 marks, released Week 5' },
  { id: 'ba-a2', title: 'Assignment 2', subject: 'BA', type: 'ga', date: '2026-03-22', priority: 3, description: '10 marks, released Week 6' },
  { id: 'ba-a3', title: 'Assignment 3', subject: 'BA', type: 'ga', date: '2026-04-15', priority: 3, description: '10 marks, released Week 9' },
];

// ── SC BPTs ──
const scBPTs: DeadlineItem[] = [
  { id: 'sc-bpt1', title: 'BPT 1', subject: 'SC', type: 'bpt', date: '2026-02-20', priority: 4, description: 'Week 3, 4 questions in VM' },
  { id: 'sc-bpt2', title: 'BPT 2', subject: 'SC', type: 'bpt', date: '2026-03-06', priority: 4, description: 'Week 5' },
  { id: 'sc-bpt3', title: 'BPT 3', subject: 'SC', type: 'bpt', date: '2026-03-20', priority: 4, description: 'Week 7' },
  { id: 'sc-bpt4', title: 'BPT 4', subject: 'SC', type: 'bpt', date: '2026-04-10', priority: 4, description: 'Week 10' },
];

// ── Stats 1 Extra Activities ──
const stats1Extra: DeadlineItem[] = [
  { id: 'stats1-ea1', title: 'Extra Activity 1', subject: 'STATS1', type: 'extra_activity', date: '2026-03-25', priority: 4, description: 'Peer review by Mar 29' },
  { id: 'stats1-ea2', title: 'Extra Activity 2', subject: 'STATS1', type: 'extra_activity', date: '2026-03-25', priority: 4, description: 'Peer review by Mar 29' },
  { id: 'stats1-ea3', title: 'Extra Activity 3', subject: 'STATS1', type: 'extra_activity', date: '2026-04-08', priority: 4, description: 'Peer review by Apr 12' },
  { id: 'stats1-ea4', title: 'Extra Activity 4', subject: 'STATS1', type: 'extra_activity', date: '2026-04-22', priority: 4, description: 'Peer review by Apr 26' },
];

// ── Stats 2 Extra Activities ──
const stats2Extra: DeadlineItem[] = [
  { id: 'stats2-ea1', title: 'Extra Activity 1', subject: 'STATS2', type: 'extra_activity', date: '2026-02-18', priority: 4, description: 'Peer review by Feb 22' },
  { id: 'stats2-ea2', title: 'Extra Activity 2', subject: 'STATS2', type: 'extra_activity', date: '2026-03-04', priority: 4, description: 'Peer review by Mar 8' },
  { id: 'stats2-ea3', title: 'Extra Activity 3', subject: 'STATS2', type: 'extra_activity', date: '2026-03-18', priority: 4, description: 'Peer review by Mar 22' },
  { id: 'stats2-ea4', title: 'Extra Activity 4', subject: 'STATS2', type: 'extra_activity', date: '2026-04-01', priority: 4, description: 'Peer review by Apr 5' },
  { id: 'stats2-ea5', title: 'Extra Activity 5', subject: 'STATS2', type: 'extra_activity', date: '2026-04-15', priority: 4, description: 'Peer review by Apr 19' },
];

// ── Maths 2 Extra Activities ──
const maths2Extra: DeadlineItem[] = [
  { id: 'maths2-ea1', title: 'Extra Activity 1', subject: 'MATHS2', type: 'extra_activity', date: '2026-03-04', priority: 4 },
  { id: 'maths2-ea2', title: 'Extra Activity 2', subject: 'MATHS2', type: 'extra_activity', date: '2026-03-25', priority: 4 },
  { id: 'maths2-ea3', title: 'Extra Activity 3', subject: 'MATHS2', type: 'extra_activity', date: '2026-04-17', priority: 4 },
];

// ── DL GenAI Theory specific ──
const dlGenaiItems: DeadlineItem[] = [
  { id: 'dlg-form1', title: 'Registration Form', subject: 'DL_GENAI', type: 'form', date: '2026-02-17', priority: 3 },
  { id: 'dlg-form3', title: 'Deployment Link', subject: 'DL_GENAI', type: 'form', date: '2026-03-12', priority: 3 },
  { id: 'dlg-form2', title: 'Report Submission', subject: 'DL_GENAI', type: 'form', date: '2026-03-30', priority: 3 },
  { id: 'dlg-m1', title: 'Milestone 1 — EDA & Baseline', subject: 'DL_GENAI', type: 'milestone', date: '2026-02-18', priority: 3, description: 'EDA, rule-based baseline, Kaggle submission' },
  { id: 'dlg-m2', title: 'Milestone 2 — Classical ML', subject: 'DL_GENAI', type: 'milestone', date: '2026-02-25', priority: 3, description: 'BoW/TF-IDF, classical models' },
  { id: 'dlg-m3', title: 'Milestone 3 — First Neural Network', subject: 'DL_GENAI', type: 'milestone', date: '2026-03-04', priority: 3, description: 'PyTorch basics, simple NN' },
  { id: 'dlg-m4', title: 'Milestone 4 — Sequential Models', subject: 'DL_GENAI', type: 'milestone', date: '2026-03-11', priority: 3, description: 'RNN/LSTM/GRU' },
  { id: 'dlg-m5', title: 'Milestone 5 — Transformers', subject: 'DL_GENAI', type: 'milestone', date: '2026-03-18', priority: 3, description: 'BERT/RoBERTa fine-tuning' },
  { id: 'dlg-final', title: 'Final Submission & Presentation', subject: 'DL_GENAI', type: 'project', date: '2026-03-18', priority: 2, description: 'Final Kaggle submission, report, presentation' },
];

// ── MLP Project milestones ──
const mlpProjItems: DeadlineItem[] = [
  { id: 'mlpproj-m1', title: 'Milestone 1 — EDA & Baseline', subject: 'MLP_PROJ', type: 'milestone', date: '2026-02-15', priority: 3, description: 'Data loading, EDA, preprocessing, baseline model' },
  { id: 'mlpproj-m2', title: 'Milestone 2 — Linear Models & SGD', subject: 'MLP_PROJ', type: 'milestone', date: '2026-02-22', priority: 3 },
  { id: 'mlpproj-m3', title: 'Milestone 3 — Dim Reduction & Classical ML', subject: 'MLP_PROJ', type: 'milestone', date: '2026-03-01', priority: 3 },
  { id: 'mlpproj-m4', title: 'Milestone 4 — Ensemble & MLP', subject: 'MLP_PROJ', type: 'milestone', date: '2026-03-08', priority: 3 },
  { id: 'mlpproj-m5', title: 'Milestone 5 — Final Submission', subject: 'MLP_PROJ', type: 'milestone', date: '2026-03-15', priority: 2 },
  { id: 'mlpproj-cutoff', title: 'Cross Cutoff Deadline', subject: 'MLP_PROJ', type: 'project', date: '2026-03-15', priority: 1, description: 'Must cross cutoff by this date' },
  { id: 'mlpproj-viva', title: 'Complete Both Vivas', subject: 'MLP_PROJ', type: 'project', date: '2026-03-30', priority: 1, description: 'For Sep 2025 & Jan 2026 theory students' },
];

// ── MAD1 Project ──
const mad1ProjItems: DeadlineItem[] = [
  { id: 'mad1proj-sub1', title: 'Project Submission (pre-Sep 2025)', subject: 'MAD1_PROJ', type: 'project', date: '2026-03-10', priority: 2, description: 'For those who completed theory before Sep 2025' },
  { id: 'mad1proj-sub2', title: 'Project Submission (Sep/Jan)', subject: 'MAD1_PROJ', type: 'project', date: '2026-04-10', priority: 2, description: 'For Sep 2025 & Jan 2026 theory students' },
];

// ── MAD2 Project ──
const mad2ProjItems: DeadlineItem[] = [
  { id: 'mad2proj-sub1', title: 'Project Submission (pre-Sep 2025)', subject: 'MAD2_PROJ', type: 'project', date: '2026-03-10', priority: 2, description: 'For those who completed theory before Sep 2025' },
  { id: 'mad2proj-sub2', title: 'Project Submission (Sep/Jan)', subject: 'MAD2_PROJ', type: 'project', date: '2026-04-10', priority: 2, description: 'For Sep 2025 & Jan 2026 theory students' },
];

// ── SE Milestones ──
const seItems: DeadlineItem[] = [
  { id: 'se-m1', title: 'Milestone 1', subject: 'SE', type: 'milestone', date: '2026-02-22', priority: 3, description: 'Group project milestone' },
  { id: 'se-m2', title: 'Milestone 2', subject: 'SE', type: 'milestone', date: '2026-03-22', priority: 3 },
  { id: 'se-m3', title: 'Milestone 3 (Sprint 1)', subject: 'SE', type: 'milestone', date: '2026-04-05', priority: 3, description: 'Peer review by Apr 26' },
  { id: 'se-m4', title: 'Milestone 4 (Sprint 2)', subject: 'SE', type: 'milestone', date: '2026-04-14', priority: 3 },
  { id: 'se-m5', title: 'Milestone 5', subject: 'SE', type: 'milestone', date: '2026-04-20', priority: 3 },
];

// ── SPG Project Milestones ──
const spgItems: DeadlineItem[] = [
  { id: 'spg-m1', title: 'Group Project Milestone I', subject: 'SPG', type: 'milestone', date: '2026-03-01', priority: 3, description: 'Week 1-3, 50 marks' },
  { id: 'spg-m2', title: 'Group Project Milestone II', subject: 'SPG', type: 'milestone', date: '2026-03-22', priority: 3, description: 'Week 4-6, 50 marks' },
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
  ...dlGenaiItems,
  ...mlpProjItems,
  ...mad1ProjItems,
  ...mad2ProjItems,
  ...seItems,
  ...spgItems,
].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
