export interface ResumeProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string; // Bullet points joined by newline
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Skill {
  id: string;
  category: string;
  items: string; // Comma separated
}

export interface ResumeData {
  id: string;
  title: string;
  lastUpdated: string;
  profile: ResumeProfile;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
}

export type SectionType = 'profile' | 'experience' | 'education' | 'projects' | 'skills';

export interface AIResponse {
  text: string;
  error?: string;
}
