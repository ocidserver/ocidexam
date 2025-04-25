
export interface StudyTopic {
  id: number | string;
  name: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  completionRate: number;
}
