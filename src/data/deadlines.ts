import { DeadlineItem } from '@/types/deadline';

const gaWeeks = [
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

const subjects = ['MLP', 'DL_GENAI', 'TDS'] as const;

// Generate GAs for all 3 subjects
const gradedAssignments: DeadlineItem[] = gaWeeks.flatMap(({ week, date }) =>
  subjects.map((subject) => ({
    id: `ga-${subject.toLowerCase()}-w${week}`,
    title: `GA Week ${week}`,
    subject,
    type: 'ga' as const,
    date,
    priority: 5,
  }))
);

const exams: DeadlineItem[] = [
  { id: 'exam-quiz1', title: 'Quiz 1', subject: 'ALL', type: 'exam', date: '2026-03-15', priority: 1 },
  { id: 'exam-quiz2', title: 'Quiz 2', subject: 'ALL', type: 'exam', date: '2026-04-12', priority: 1 },
  { id: 'exam-final', title: 'Final Exam', subject: 'ALL', type: 'exam', date: '2026-05-10', priority: 1 },
];

const mlpItems: DeadlineItem[] = [
  { id: 'mlp-oppe1', title: 'OPPE 1', subject: 'MLP', type: 'oppe', date: '2026-04-04', priority: 1 },
  { id: 'mlp-oppe2', title: 'OPPE 2', subject: 'MLP', type: 'oppe', date: '2026-04-26', priority: 1 },
  // Project Milestones
  { id: 'mlp-m1', title: 'Project M1 — EDA & Baseline', subject: 'MLP', type: 'milestone', date: '2026-02-15', priority: 3, description: 'Data loading, EDA, train-val split, preprocessing, baseline model' },
  { id: 'mlp-m2', title: 'Project M2 — Linear Models & SGD', subject: 'MLP', type: 'milestone', date: '2026-02-22', priority: 3, description: 'Linear models, SGD, hyperparameter tuning' },
  { id: 'mlp-m3', title: 'Project M3 — Dim Reduction & Classical ML', subject: 'MLP', type: 'milestone', date: '2026-03-01', priority: 3, description: 'Feature selection, Naive Bayes, KNN, SVM' },
  { id: 'mlp-m4', title: 'Project M4 — Ensemble & MLP', subject: 'MLP', type: 'milestone', date: '2026-03-08', priority: 3, description: 'Bagging, Boosting, Stacking, Multi-layer Perceptron' },
  { id: 'mlp-m5', title: 'Project M5 — Final Submission', subject: 'MLP', type: 'milestone', date: '2026-03-15', priority: 2, description: 'Repeat ML pipeline with insights, last submission' },
  // Kaggle
  { id: 'mlp-ka1', title: 'KA1 Submission', subject: 'MLP', type: 'kaggle', date: '2026-03-18', priority: 4 },
  { id: 'mlp-ka1-review', title: 'KA1 Peer Review', subject: 'MLP', type: 'kaggle_review', date: '2026-03-22', priority: 4 },
  { id: 'mlp-ka2', title: 'KA2 Submission', subject: 'MLP', type: 'kaggle', date: '2026-04-02', priority: 4 },
  { id: 'mlp-ka2-review', title: 'KA2 Peer Review', subject: 'MLP', type: 'kaggle_review', date: '2026-04-06', priority: 4 },
  { id: 'mlp-ka3', title: 'KA3 Submission', subject: 'MLP', type: 'kaggle', date: '2026-04-17', priority: 4 },
  { id: 'mlp-ka3-review', title: 'KA3 Peer Review', subject: 'MLP', type: 'kaggle_review', date: '2026-04-21', priority: 4 },
];

const dlGenaiItems: DeadlineItem[] = [
  // Forms
  { id: 'dlg-form1', title: 'Registration Form', subject: 'DL_GENAI', type: 'form', date: '2026-02-17', priority: 3 },
  { id: 'dlg-form3', title: 'Deployment Link', subject: 'DL_GENAI', type: 'form', date: '2026-03-12', priority: 3 },
  { id: 'dlg-form2', title: 'Report Submission', subject: 'DL_GENAI', type: 'form', date: '2026-03-30', priority: 3 },
  // Milestones
  { id: 'dlg-m1', title: 'M1 — EDA & Baseline', subject: 'DL_GENAI', type: 'milestone', date: '2026-02-18', priority: 3, description: 'EDA, rule-based baseline, Kaggle submission' },
  { id: 'dlg-m2', title: 'M2 — Classical ML', subject: 'DL_GENAI', type: 'milestone', date: '2026-02-25', priority: 3, description: 'Text preprocessing, BoW/TF-IDF, classical models' },
  { id: 'dlg-m3', title: 'M3 — First Neural Network', subject: 'DL_GENAI', type: 'milestone', date: '2026-03-04', priority: 3, description: 'PyTorch basics, simple NN, training loop' },
  { id: 'dlg-m4', title: 'M4 — Sequential Models', subject: 'DL_GENAI', type: 'milestone', date: '2026-03-11', priority: 3, description: 'RNN/LSTM/GRU implementation' },
  { id: 'dlg-m5', title: 'M5 — Transformers', subject: 'DL_GENAI', type: 'milestone', date: '2026-03-18', priority: 3, description: 'BERT/RoBERTa fine-tuning' },
  { id: 'dlg-final', title: 'Final Submission & Presentation', subject: 'DL_GENAI', type: 'project', date: '2026-03-18', priority: 2, description: 'Final Kaggle submission, report, presentation' },
];

const tdsItems: DeadlineItem[] = [
  { id: 'tds-p1', title: 'Project 1', subject: 'TDS', type: 'project', date: '2026-03-30', priority: 2, description: '20% weightage' },
  { id: 'tds-p2', title: 'Project 2', subject: 'TDS', type: 'project', date: '2026-04-13', priority: 2, description: '20% weightage' },
  { id: 'tds-roe', title: 'ROE (Remote Online Exam)', subject: 'TDS', type: 'roe', date: '2026-04-05', priority: 1, description: '20% weightage, hard exam' },
];

export const ALL_DEADLINES: DeadlineItem[] = [
  ...gradedAssignments,
  ...exams,
  ...mlpItems,
  ...dlGenaiItems,
  ...tdsItems,
].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
