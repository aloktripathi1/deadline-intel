export type Subject = 'MLP' | 'DL_GENAI' | 'TDS';

export type DeadlineType = 'ga' | 'exam' | 'milestone' | 'oppe' | 'kaggle' | 'kaggle_review' | 'form' | 'project' | 'roe';

export type UrgencyZone = 'red' | 'orange' | 'green' | 'overdue';

export interface DeadlineItem {
  id: string;
  title: string;
  subject: Subject | 'ALL';
  type: DeadlineType;
  date: string; // ISO date string
  description?: string;
  priority: number; // 1=highest (exams), 5=lowest (GAs)
}

export interface DeadlineState {
  completedIds: string[];
  streak: number;
  lastCompletionDate: string | null;
  theme: 'dark' | 'light';
}

export const SUBJECT_LABELS: Record<Subject | 'ALL', string> = {
  MLP: 'Machine Learning Practice',
  DL_GENAI: 'Deep Learning & GenAI',
  TDS: 'Tools in Data Science',
  ALL: 'All Subjects',
};

export const SUBJECT_COLORS: Record<Subject, string> = {
  MLP: 'steel',
  DL_GENAI: 'amber',
  TDS: 'emerald',
};

export function getUrgencyZone(daysLeft: number): UrgencyZone {
  if (daysLeft < 0) return 'overdue';
  if (daysLeft <= 5) return 'red';
  if (daysLeft <= 10) return 'orange';
  return 'green';
}

export function getDaysLeft(dateStr: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function getPriorityLabel(type: DeadlineType): string {
  switch (type) {
    case 'exam': return 'Exam';
    case 'oppe': return 'OPPE';
    case 'project': return 'Project';
    case 'milestone': return 'Milestone';
    case 'kaggle': return 'Kaggle';
    case 'kaggle_review': return 'Peer Review';
    case 'form': return 'Form';
    case 'roe': return 'ROE';
    case 'ga': return 'Graded Assignment';
    default: return 'Task';
  }
}
