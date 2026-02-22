export type CourseLevel = 'foundation' | 'diploma' | 'degree';

export type Subject =
  // Foundation
  | 'MATHS1' | 'ENG1' | 'CT' | 'STATS1' | 'MATHS2' | 'ENG2' | 'PYTHON' | 'STATS2'
  // Diploma
  | 'MLF' | 'MLT' | 'MLP' | 'BDM' | 'BA' | 'TDS' | 'PDSA' | 'DBMS' | 'MAD1' | 'JAVA' | 'SC' | 'MAD2' | 'DL_GENAI'
  // Diploma Projects
  | 'MLP_PROJ' | 'BDM_PROJ' | 'MAD1_PROJ' | 'MAD2_PROJ' | 'DL_GENAI_PROJ'
  // Degree
  | 'ST' | 'SE' | 'DL' | 'AI_SM' | 'SPG' | 'BIG_DATA' | 'C_PROG' | 'DL_CV' | 'LLM' | 'DLP' | 'INDUSTRY4' | 'OS' | 'RL' | 'CORP_FIN' | 'COMP_NET' | 'DS_AI_LAB' | 'APPDEV_LAB' | 'BIOINFO' | 'BIO_NET' | 'MKT_RES' | 'STAT_COMP' | 'ADV_ALGO' | 'MGRL_ECON' | 'SPEECH_TECH' | 'MLOPS' | 'MATH_GENAI' | 'TOC';

export type DeadlineType = 'ga' | 'exam' | 'milestone' | 'oppe' | 'kaggle' | 'kaggle_review' | 'form' | 'project' | 'roe' | 'quiz' | 'endterm' | 'extra_activity' | 'bpt';

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
  selectedCourses: Subject[];
}

export interface CourseInfo {
  id: Subject;
  name: string;
  shortName: string;
  level: CourseLevel;
  hasOPPE: boolean;
  hasQuiz1: boolean;
  hasQuiz2: boolean;
  isProject: boolean;
}

export const COURSE_CATALOG: CourseInfo[] = [
  // Foundation
  { id: 'MATHS1', name: 'Mathematics for Data Science 1', shortName: 'Maths 1', level: 'foundation', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'ENG1', name: 'English 1', shortName: 'English 1', level: 'foundation', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'CT', name: 'Computational Thinking', shortName: 'CT', level: 'foundation', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'STATS1', name: 'Statistics for Data Science 1', shortName: 'Stats 1', level: 'foundation', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'MATHS2', name: 'Mathematics for Data Science 2', shortName: 'Maths 2', level: 'foundation', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'ENG2', name: 'English 2', shortName: 'English 2', level: 'foundation', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'PYTHON', name: 'Introduction to Python Programming', shortName: 'Python', level: 'foundation', hasOPPE: true, hasQuiz1: true, hasQuiz2: false, isProject: false },
  { id: 'STATS2', name: 'Statistics for Data Science 2', shortName: 'Stats 2', level: 'foundation', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  // Diploma Theory
  { id: 'MLF', name: 'Machine Learning Foundations', shortName: 'MLF', level: 'diploma', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'MLT', name: 'Machine Learning Techniques', shortName: 'MLT', level: 'diploma', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'MLP', name: 'Machine Learning Practice', shortName: 'MLP', level: 'diploma', hasOPPE: true, hasQuiz1: false, hasQuiz2: false, isProject: false },
  { id: 'BDM', name: 'Business Data Management', shortName: 'BDM', level: 'diploma', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'BA', name: 'Business Analytics', shortName: 'BA', level: 'diploma', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'TDS', name: 'Tools in Data Science', shortName: 'TDS', level: 'diploma', hasOPPE: false, hasQuiz1: false, hasQuiz2: false, isProject: false },
  { id: 'PDSA', name: 'Programming, DSA using Python', shortName: 'PDSA', level: 'diploma', hasOPPE: true, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'DBMS', name: 'Database Management Systems', shortName: 'DBMS', level: 'diploma', hasOPPE: true, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'MAD1', name: 'Application Development 1', shortName: 'MAD 1', level: 'diploma', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'JAVA', name: 'Programming Concepts using Java', shortName: 'Java', level: 'diploma', hasOPPE: true, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'SC', name: 'System Commands', shortName: 'SC', level: 'diploma', hasOPPE: true, hasQuiz1: true, hasQuiz2: false, isProject: false },
  { id: 'MAD2', name: 'Application Development 2', shortName: 'MAD 2', level: 'diploma', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'DL_GENAI', name: 'Intro to Deep Learning & GenAI', shortName: 'DL GenAI', level: 'diploma', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  // Diploma Projects
  { id: 'MLP_PROJ', name: 'MLP Project', shortName: 'MLP Proj', level: 'diploma', hasOPPE: false, hasQuiz1: false, hasQuiz2: false, isProject: true },
  { id: 'BDM_PROJ', name: 'BDM Project', shortName: 'BDM Proj', level: 'diploma', hasOPPE: false, hasQuiz1: false, hasQuiz2: false, isProject: true },
  { id: 'MAD1_PROJ', name: 'MAD 1 Project', shortName: 'MAD1 Proj', level: 'diploma', hasOPPE: false, hasQuiz1: false, hasQuiz2: false, isProject: true },
  { id: 'MAD2_PROJ', name: 'MAD 2 Project', shortName: 'MAD2 Proj', level: 'diploma', hasOPPE: false, hasQuiz1: false, hasQuiz2: false, isProject: true },
  { id: 'DL_GENAI_PROJ', name: 'DL GenAI Project', shortName: 'DLG Proj', level: 'diploma', hasOPPE: false, hasQuiz1: false, hasQuiz2: false, isProject: true },
  // Degree
  { id: 'ST', name: 'Software Testing', shortName: 'ST', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'SE', name: 'Software Engineering', shortName: 'SE', level: 'degree', hasOPPE: false, hasQuiz1: false, hasQuiz2: true, isProject: false },
  { id: 'DL', name: 'Deep Learning', shortName: 'DL', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'AI_SM', name: 'AI: Search Methods for Problem Solving', shortName: 'AI Search', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'SPG', name: 'Strategies for Professional Growth', shortName: 'SPG', level: 'degree', hasOPPE: false, hasQuiz1: false, hasQuiz2: true, isProject: false },
  { id: 'BIG_DATA', name: 'Introduction to Big Data', shortName: 'Big Data', level: 'degree', hasOPPE: true, hasQuiz1: false, hasQuiz2: false, isProject: false },
  { id: 'C_PROG', name: 'Programming in C', shortName: 'C Prog', level: 'degree', hasOPPE: true, hasQuiz1: true, hasQuiz2: false, isProject: false },
  { id: 'DL_CV', name: 'Deep Learning for CV', shortName: 'DL CV', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'LLM', name: 'Large Language Models', shortName: 'LLM', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'DLP', name: 'Deep Learning Practice', shortName: 'DLP', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'INDUSTRY4', name: 'Industry 4.0', shortName: 'Ind 4.0', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'OS', name: 'Operating Systems', shortName: 'OS', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'RL', name: 'Special Topics in ML (RL)', shortName: 'RL', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'CORP_FIN', name: 'Corporate Finance', shortName: 'Corp Fin', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'COMP_NET', name: 'Computer Networks', shortName: 'Comp Net', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'DS_AI_LAB', name: 'Data Science and AI Lab', shortName: 'DS AI Lab', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'APPDEV_LAB', name: 'Application Development Lab', shortName: 'AppDev Lab', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'BIOINFO', name: 'Algorithmic Thinking in Bioinformatics', shortName: 'Bioinfo', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'BIO_NET', name: 'Big Data and Biological Networks', shortName: 'Bio Net', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'MKT_RES', name: 'Market Research', shortName: 'Mkt Res', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'STAT_COMP', name: 'Statistical Computing', shortName: 'Stat Comp', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'ADV_ALGO', name: 'Advanced Algorithms', shortName: 'Adv Algo', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'MGRL_ECON', name: 'Managerial Economics', shortName: 'Mgrl Econ', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'SPEECH_TECH', name: 'Speech Technology', shortName: 'Speech', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'MLOPS', name: 'Machine Learning Operations', shortName: 'MLOps', level: 'degree', hasOPPE: true, hasQuiz1: false, hasQuiz2: false, isProject: false },
  { id: 'MATH_GENAI', name: 'Mathematical Foundations of GenAI', shortName: 'Math GenAI', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
  { id: 'TOC', name: 'Theory of Computation', shortName: 'ToC', level: 'degree', hasOPPE: false, hasQuiz1: true, hasQuiz2: true, isProject: false },
];

export const SUBJECT_LABELS: Record<string, string> = Object.fromEntries(
  COURSE_CATALOG.map(c => [c.id, c.shortName])
);
SUBJECT_LABELS['ALL'] = 'All Courses';

export const LEVEL_COLORS: Record<CourseLevel, string> = {
  foundation: 'steel',
  diploma: 'amber',
  degree: 'emerald',
};

export function getCourseLevel(subject: Subject | 'ALL'): CourseLevel | null {
  if (subject === 'ALL') return null;
  const course = COURSE_CATALOG.find(c => c.id === subject);
  return course?.level ?? null;
}

export function getSubjectColor(subject: Subject | 'ALL'): string {
  const level = getCourseLevel(subject);
  if (!level) return 'muted';
  return LEVEL_COLORS[level];
}

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
    case 'quiz': return 'Quiz';
    case 'endterm': return 'End Term';
    case 'oppe': return 'OPPE';
    case 'project': return 'Project';
    case 'milestone': return 'Milestone';
    case 'kaggle': return 'Kaggle';
    case 'kaggle_review': return 'Peer Review';
    case 'form': return 'Form';
    case 'roe': return 'ROE';
    case 'ga': return 'Graded Assignment';
    case 'extra_activity': return 'Extra Activity';
    case 'bpt': return 'BPT';
    default: return 'Task';
  }
}
