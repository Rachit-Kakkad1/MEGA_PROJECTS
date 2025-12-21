
import { Severity, Project, Repository } from './types';

export const SEVERITY_COLORS = {
  [Severity.CRITICAL]: 'text-red-400 bg-red-400/10 border-red-400/20',
  [Severity.HIGH]: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  [Severity.MEDIUM]: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  [Severity.LOW]: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
};

export const MOCK_PROJECTS: Project[] = [
  { id: 'p1', name: 'Alpha Core API', repoCount: 3, lastScan: '2024-05-20T10:30:00Z', healthScore: 82, criticalIssues: 0 },
  { id: 'p2', name: 'Legacy Payments Portal', repoCount: 1, lastScan: '2024-05-19T14:15:00Z', healthScore: 45, criticalIssues: 4 },
  { id: 'p3', name: 'Mobile SDK - iOS', repoCount: 2, lastScan: '2024-05-18T09:45:00Z', healthScore: 91, criticalIssues: 0 },
];

export const MOCK_REPOS: Repository[] = [
  { id: 'r1', name: 'sentinel-core', provider: 'github', autoScan: true, lastCommit: 'Merge pull request #124' },
  { id: 'r2', name: 'auth-service', provider: 'github', autoScan: false, lastCommit: 'Update dependencies' },
  { id: 'r3', name: 'billing-api', provider: 'gitlab', autoScan: true, lastCommit: 'Hotfix for payment gateway' },
];

export const INTEGRATION_TEMPLATES = {
  githubActions: `name: Sentinel AI Scan
on: [push, pull_request]
jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Sentinel Scan
        uses: sentinel-ai/scan-action@v1
        with:
          api-key: \${{ secrets.SENTINEL_API_KEY }}`,
  gitlabCI: `sentinel_scan:
  stage: test
  image: sentinelai/scanner:latest
  script:
    - sentinel-cli scan --api-key $SENTINEL_API_KEY
  only:
    - merge_requests
    - main`,
  jenkins: `pipeline {
    agent any
    stages {
        stage('Security Scan') {
            steps {
                withCredentials([string(credentialsId: 'sentinel-key', variable: 'SENTINEL_API_KEY')]) {
                    sh 'sentinel-cli scan --api-key $SENTINEL_API_KEY'
                }
            }
        }
    }
}`
};

export const SAMPLE_CODE = {
  python: `import sqlite3

def get_user_data(username):
    # DANGEROUS: SQL Injection vulnerability
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE username = '" + username + "'"
    cursor.execute(query)
    return cursor.fetchone()

# Example usage
data = get_user_data("admin' OR '1'='1")
print(data)`,
  javascript: `const express = require('express');
const app = express();

app.get('/redirect', (req, res) => {
  // DANGEROUS: Open redirect vulnerability
  const url = req.query.url;
  if (url) {
    res.redirect(url);
  }
});`,
  c: `#include <stdio.h>
#include <string.h>

void vulnerable_function(char *str) {
    char buffer[16];
    // DANGEROUS: Buffer overflow vulnerability
    strcpy(buffer, str);
}

int main() {
    char *large_str = "This string is much larger than sixteen characters";
    vulnerable_function(large_str);
    return 0;
}`
};

export const MOCK_HISTORY = [
  {
    id: 'scan_01',
    timestamp: '2024-05-20T10:30:00Z',
    language: 'Python',
    overallScore: 42,
    vulnerabilitiesCount: 3
  },
  {
    id: 'scan_02',
    timestamp: '2024-05-19T14:15:00Z',
    language: 'JavaScript',
    overallScore: 88,
    vulnerabilitiesCount: 1
  },
  {
    id: 'scan_03',
    timestamp: '2024-05-18T09:45:00Z',
    language: 'C',
    overallScore: 12,
    vulnerabilitiesCount: 7
  }
];
