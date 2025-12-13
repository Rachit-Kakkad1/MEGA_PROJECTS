export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate: string; // ISO string
  status: Status;
  createdAt: number;
  category: string;
  subtasks?: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Stats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}
