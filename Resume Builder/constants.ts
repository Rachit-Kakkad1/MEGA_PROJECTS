import { ResumeData } from './types';

export const INITIAL_RESUME: ResumeData = {
  id: 'default',
  title: 'My Professional Resume',
  lastUpdated: new Date().toISOString(),
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  experience: [],
  education: [],
  projects: [],
  skills: [],
};

export const MOCK_RESUME: ResumeData = {
  id: 'mock-1',
  title: 'Software Engineer Resume',
  lastUpdated: new Date().toISOString(),
  profile: {
    firstName: 'Alex',
    lastName: 'Mercer',
    email: 'alex.mercer@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmercer',
    website: 'alexmercer.dev',
    summary: 'Senior Full Stack Engineer with 6+ years of experience building scalable SaaS applications. Expert in React, TypeScript, and Cloud Architecture. Proven track record of reducing latency by 40% and mentoring junior developers.',
  },
  experience: [
    {
      id: '1',
      company: 'TechFlow Solutions',
      position: 'Senior Frontend Engineer',
      startDate: '2021-03',
      endDate: '',
      current: true,
      location: 'Remote',
      description: '• Architected a new component library using React and Tailwind, reducing development time by 30%.\n• Led a team of 5 engineers to migrate legacy code to TypeScript, improving code stability.\n• Optimized application performance, achieving a 98/100 Lighthouse score.'
    },
    {
      id: '2',
      company: 'Innovate Corp',
      position: 'Software Developer',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      location: 'Austin, TX',
      description: '• Developed RESTful APIs using Python FastAPI serving 10k+ daily users.\n• Implemented automated testing pipelines (CI/CD) which reduced bug reports by 25%.\n• Collaborated with product managers to define feature roadmaps and technical requirements.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2014-09',
      endDate: '2018-05',
      current: false,
      location: 'Austin, TX'
    }
  ],
  projects: [],
  skills: [
    {
      id: '1',
      category: 'Languages',
      items: 'JavaScript, TypeScript, Python, SQL, HTML, CSS'
    },
    {
      id: '2',
      category: 'Frameworks',
      items: 'React, Next.js, FastAPI, Node.js, Django'
    },
    {
      id: '3',
      category: 'Tools',
      items: 'Git, Docker, AWS, Jenkins, Jira'
    }
  ]
};
