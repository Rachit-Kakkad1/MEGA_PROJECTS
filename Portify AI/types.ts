export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface PortfolioBasics {
  name: string;
  headline: string;
  email: string;
  location: string;
  summary: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  templateId: 'modern' | 'minimal' | 'creative';
  themeColor: string;
  basics: PortfolioBasics;
  skills: string[];
  projects: Project[];
  experience: Experience[];
  published: boolean;
  lastUpdated: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export type ViewState = 'LANDING' | 'AUTH' | 'DASHBOARD' | 'EDITOR' | 'PREVIEW_FULL';

export interface AIResponse {
  text: string;
  suggestions?: string[];
}