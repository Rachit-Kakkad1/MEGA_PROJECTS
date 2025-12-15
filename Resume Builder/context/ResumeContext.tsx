import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ResumeData, Experience, Education, Project, Skill } from '../types';
import { INITIAL_RESUME, MOCK_RESUME } from '../constants';

type Action =
  | { type: 'SET_RESUME'; payload: ResumeData }
  | { type: 'UPDATE_PROFILE'; payload: Partial<ResumeData['profile']> }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<Experience> } }
  | { type: 'REMOVE_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: { id: string; data: Partial<Skill> } }
  | { type: 'REMOVE_SKILL'; payload: string }
  | { type: 'RESET' };

const ResumeContext = createContext<{
  resume: ResumeData;
  dispatch: React.Dispatch<Action>;
  saveResume: () => void;
} | undefined>(undefined);

const resumeReducer = (state: ResumeData, action: Action): ResumeData => {
  switch (action.type) {
    case 'SET_RESUME':
      return action.payload;
    case 'UPDATE_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.payload } };
    case 'ADD_EXPERIENCE':
      return { ...state, experience: [...state.experience, action.payload] };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map((exp) =>
          exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
        ),
      };
    case 'REMOVE_EXPERIENCE':
      return { ...state, experience: state.experience.filter((exp) => exp.id !== action.payload) };
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((edu) =>
          edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
        ),
      };
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter((edu) => edu.id !== action.payload) };
    case 'ADD_SKILL':
      return { ...state, skills: [...state.skills, action.payload] };
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map((skill) =>
          skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill
        ),
      };
    case 'REMOVE_SKILL':
      return { ...state, skills: state.skills.filter((skill) => skill.id !== action.payload) };
    case 'RESET':
      return INITIAL_RESUME;
    default:
      return state;
  }
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from local storage or fallback to mock
  const loadInitialState = () => {
    const saved = localStorage.getItem('resume_data');
    return saved ? JSON.parse(saved) : MOCK_RESUME;
  };

  const [resume, dispatch] = useReducer(resumeReducer, loadInitialState());

  useEffect(() => {
    localStorage.setItem('resume_data', JSON.stringify(resume));
  }, [resume]);

  const saveResume = () => {
     localStorage.setItem('resume_data', JSON.stringify(resume));
  };

  return (
    <ResumeContext.Provider value={{ resume, dispatch, saveResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
