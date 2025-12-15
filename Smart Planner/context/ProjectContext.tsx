import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Project, Task, TaskStatus, Priority, User } from '../types';
import { analyzeProjectRisks } from '../services/geminiService';

// Mock Initial Data
const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design System Setup',
    description: 'Initialize Tailwind config and base component library.',
    status: TaskStatus.DONE,
    priority: Priority.HIGH,
    storyPoints: 3,
    tags: ['Frontend', 'Design'],
    dueDate: new Date().toISOString(),
    assignee: 'Alice',
  },
  {
    id: '2',
    title: 'Auth Integration',
    description: 'Connect to JWT backend endpoint.',
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.CRITICAL,
    storyPoints: 5,
    tags: ['Backend', 'Security'],
    assignee: 'Bob',
  },
  {
    id: '3',
    title: 'AI Service Layer',
    description: 'Implement Gemini API calls for planner.',
    status: TaskStatus.TODO,
    priority: Priority.HIGH,
    storyPoints: 8,
    tags: ['AI', 'Core'],
  }
];

interface ProjectContextType {
  project: Project;
  tasks: Task[];
  users: User[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  addMultipleTasks: (tasks: Task[]) => void;
  refreshAnalysis: () => Promise<void>;
  riskAnalysis: { score: number; text: string; suggestions: string[] } | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Simulating single active project for this demo
  const [project] = useState<Project>({
    id: 'proj_1',
    name: 'SaaS Platform V1',
    description: 'Core MVP development for the new project management tool.',
    members: ['Alice', 'Bob', 'Charlie'],
    tasks: [],
  });

  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  
  const [users] = useState<User[]>([
    { id: 'u1', name: 'Alice', role: 'MANAGER', avatar: 'https://i.pravatar.cc/150?u=a' },
    { id: 'u2', name: 'Bob', role: 'MEMBER', avatar: 'https://i.pravatar.cc/150?u=b' },
    { id: 'u3', name: 'Charlie', role: 'MEMBER', avatar: 'https://i.pravatar.cc/150?u=c' },
  ]);

  const [riskAnalysis, setRiskAnalysis] = useState<{ score: number; text: string; suggestions: string[] } | null>(null);

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const addMultipleTasks = (newTasks: Task[]) => {
    setTasks(prev => [...prev, ...newTasks]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...updates } : t));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const refreshAnalysis = useCallback(async () => {
    const result = await analyzeProjectRisks(tasks);
    setRiskAnalysis({
      score: result.riskScore,
      text: result.analysis,
      suggestions: result.suggestions
    });
  }, [tasks]);

  // Initial load analysis
  useEffect(() => {
    refreshAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProjectContext.Provider value={{ 
      project, 
      tasks, 
      users, 
      addTask, 
      updateTask, 
      deleteTask, 
      moveTask, 
      addMultipleTasks,
      riskAnalysis,
      refreshAnalysis
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProject must be used within ProjectProvider");
  return context;
};
