
export type StudyTopicStatus = "Not Started" | "In Progress" | "Completed";
export type StudyTopicLevel = "Beginner" | "Intermediate" | "Advanced";

export interface StudyTopic {
  id: number | string;
  name: string;
  description: string;
  category: string;
  level: StudyTopicLevel;
  completionRate: number;
  status?: StudyTopicStatus;
  lastAccessed?: string;
  sections?: {
    theory: boolean;
    examples: boolean;
    practice: boolean;
    quiz: boolean;
  };
  quizScore?: number;
}

export interface StudySection {
  title: string;
  content: string;
  completed: boolean;
  type: 'theory' | 'examples' | 'practice' | 'quiz';
}
