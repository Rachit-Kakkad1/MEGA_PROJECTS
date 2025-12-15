import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Button } from './Button';
import { AIAssistant } from './AIAssistant';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; // Simple ID generation would normally be used, but since we can't add deps, we'll mock it

const generateId = () => Math.random().toString(36).substr(2, 9);

export const ProfileForm: React.FC = () => {
  const { resume, dispatch } = useResume();
  const { profile } = resume;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: { [e.target.name]: e.target.value } });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase">First Name</label>
          <input
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase">Last Name</label>
          <input
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 uppercase">Headline / Title</label>
        <input
          value={resume.title}
           onChange={(e) => dispatch({ type: 'SET_RESUME', payload: { ...resume, title: e.target.value } })}
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="e.g. Senior Software Engineer"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase">Email</label>
          <input
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase">Phone</label>
          <input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
       <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 uppercase">Location</label>
          <input
            name="location"
            value={profile.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
         <div>
          <label className="block text-xs font-medium text-slate-500 uppercase">LinkedIn (Optional)</label>
          <input
            name="linkedin"
            value={profile.linkedin}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Professional Summary</label>
        <textarea
          name="summary"
          value={profile.summary}
          onChange={handleChange}
          rows={4}
          className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <AIAssistant 
          initialText={profile.summary} 
          onAccept={(text) => dispatch({ type: 'UPDATE_PROFILE', payload: { summary: text } })}
          context="resume professional summary"
        />
      </div>
    </div>
  );
};

export const ExperienceForm: React.FC = () => {
  const { resume, dispatch } = useResume();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addExperience = () => {
    const newId = generateId();
    dispatch({
      type: 'ADD_EXPERIENCE',
      payload: {
        id: newId,
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        location: '',
        description: ''
      }
    });
    setExpandedId(newId);
  };

  return (
    <div className="space-y-4">
      {resume.experience.map((exp) => (
        <div key={exp.id} className="border border-slate-200 rounded-lg overflow-hidden">
          <div 
            className="bg-slate-50 px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-slate-100"
            onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
          >
            <div>
              <h3 className="text-sm font-semibold text-slate-800">{exp.position || '(No Position)'}</h3>
              <p className="text-xs text-slate-500">{exp.company || '(No Company)'}</p>
            </div>
            <div className="flex items-center gap-2">
               <button 
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'REMOVE_EXPERIENCE', payload: exp.id });
                }}
                className="text-slate-400 hover:text-red-500 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              {expandedId === exp.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>
          
          {expandedId === exp.id && (
            <div className="p-4 bg-white border-t border-slate-200 space-y-4">
               <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase">Company</label>
                  <input
                    value={exp.company}
                    onChange={(e) => dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id: exp.id, data: { company: e.target.value } } })}
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase">Position</label>
                  <input
                    value={exp.position}
                    onChange={(e) => dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id: exp.id, data: { position: e.target.value } } })}
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase">Start Date</label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id: exp.id, data: { startDate: e.target.value } } })}
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase">End Date</label>
                  <input
                    type="month"
                    value={exp.endDate}
                    disabled={exp.current}
                    onChange={(e) => dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id: exp.id, data: { endDate: e.target.value } } })}
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </div>
              </div>
               <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onChange={(e) => dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id: exp.id, data: { current: e.target.checked } } })}
                  className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"
                />
                <label htmlFor={`current-${exp.id}`} className="ml-2 block text-sm text-slate-700">I currently work here</label>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">Description (Bullets)</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id: exp.id, data: { description: e.target.value } } })}
                  rows={5}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  placeholder="• Achieved X by doing Y..."
                />
                 <AIAssistant 
                  initialText={exp.description} 
                  onAccept={(text) => dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id: exp.id, data: { description: text } } })}
                  context="work experience bullet points"
                />
              </div>
            </div>
          )}
        </div>
      ))}
      <Button variant="outline" onClick={addExperience} className="w-full border-dashed border-2">
        <Plus className="w-4 h-4 mr-2" /> Add Experience
      </Button>
    </div>
  );
};
