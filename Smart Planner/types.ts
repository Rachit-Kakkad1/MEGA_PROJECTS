export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assignee?: string;
  dueDate?: string; // ISO date string
  tags: string[];
  storyPoints?: number;
  aiGenerated?: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  members: string[]; // List of user names
  tasks: Task[];
}

export interface User {
  id: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'MEMBER';
  avatar: string;
}

export interface AIPlanRequest {
  goal: string;
  context?: string;
}

export interface AIRiskAnalysis {
  riskScore: number; // 0-100
  analysis: string;
  mitigationSuggestions: string[];
}
