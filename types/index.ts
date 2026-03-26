export interface User {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "student";
}

export interface Subject {
  id: string;
  name: string;
  description?: string;
}

export interface Lesson {
  id: string;
  subjectId: string;
  name: string;
  description?: string;
}

export interface Topic {
  id: string;
  lessonId: string;
  name: string;
  description?: string;
}

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
  chapter?: string;
  topic?: string;
  subjectId?: string;
  subject?: string;
  lessonId?: string;
  topicId?: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface Exam {
  id: string;
  title: string;
  questions: MCQ[];
  durationMinutes: number;
  passingScore: number;
  createdBy: string; // Admin ID
  createdAt: string;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  startTime: string;
  endTime?: string;
  answers: Record<string, number>; // MCQ id -> selected option index
  score?: number;
}
