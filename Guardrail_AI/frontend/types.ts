
export enum Severity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export interface VulnerabilityLocation {
  line: number;
  column?: number;
}

export interface Vulnerability {
  id: string;
  title: string;
  severity: Severity;
  confidence: number;
  location: VulnerabilityLocation;
  description: string;
  risk: string;
  remediation: {
    explanation: string;
    secureCode: string;
  };
}

export interface ScanResult {
  id: string;
  timestamp: string;
  language: string;
  overallScore: number;
  vulnerabilities: Vulnerability[];
  code: string;
}

export interface Project {
  id: string;
  name: string;
  repoCount: number;
  lastScan: string;
  healthScore: number;
  criticalIssues: number;
}

export interface Repository {
  id: string;
  name: string;
  provider: 'github' | 'gitlab' | 'bitbucket';
  autoScan: boolean;
  lastCommit: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'security_engineer' | 'developer';
  avatar?: string;
}

export type View = 'landing' | 'dashboard' | 'analyzer' | 'history' | 'projects' | 'integrations' | 'login' | 'results';
