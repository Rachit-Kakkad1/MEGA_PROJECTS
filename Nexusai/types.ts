export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatarUrl?: string;
}

export enum TaskStatus {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
  BLOCKED = 'Blocked'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignee?: string;
  dueDate?: string;
}

export interface ProjectPlan {
  projectName: string;
  summary: string;
  tasks: Task[];
  risks: string[];
  estimatedDuration: string;
}

export interface AnalyticsMetric {
  date: string;
  activeUsers: number;
  tasksCompleted: number;
  efficiencyScore: number;
}
