import React from 'react';
import { Portfolio } from '../types';

interface TemplateProps {
  portfolio: Portfolio;
}

// --- MODERN TEMPLATE ---
export const ModernTemplate: React.FC<TemplateProps> = ({ portfolio }) => {
  const { basics, skills, projects, experience, themeColor } = portfolio;
  
  return (
    <div className="min-h-full bg-white text-slate-900 font-sans pb-20">
      {/* Hero */}
      <header className="py-20 px-8 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold tracking-tight mb-4" style={{ color: themeColor }}>{basics.name || 'Your Name'}</h1>
        <p className="text-2xl text-slate-600 font-light mb-6">{basics.headline || 'Product Designer & Developer'}</p>
        <p className="text-lg text-slate-700 leading-relaxed max-w-2xl">{basics.summary}</p>
        <div className="mt-8 flex gap-4">
          <a href={`mailto:${basics.email}`} className="px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors">
            Contact Me
          </a>
        </div>
      </header>

      {/* Skills */}
      <section className="bg-slate-50 py-12 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Expertise</h2>
          <div className="flex flex-wrap gap-3">
            {skills.length > 0 ? skills.map(skill => (
              <span key={skill} className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 shadow-sm">
                {skill}
              </span>
            )) : <span className="text-slate-400 italic">No skills listed yet...</span>}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 border-b pb-4">Selected Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.length > 0 ? projects.map(project => (
            <div key={project.id} className="group cursor-pointer">
              <div className="aspect-video bg-slate-100 rounded-lg mb-4 overflow-hidden border border-slate-200 relative">
                 <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors" />
                 {/* Placeholder for project image */}
                 <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                 </div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-brand-600 transition-colors">{project.title}</h3>
              <p className="text-slate-600 line-clamp-3 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">{tag}</span>
                ))}
              </div>
            </div>
          )) : <p className="text-slate-400 italic">No projects added yet.</p>}
        </div>
      </section>

      {/* Experience */}
      <section className="py-20 px-8 max-w-5xl mx-auto border-t border-slate-100">
        <h2 className="text-3xl font-bold mb-10">Experience</h2>
        <div className="space-y-12">
          {experience.length > 0 ? experience.map(exp => (
            <div key={exp.id} className="relative pl-8 border-l-2 border-slate-200">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-slate-300"></div>
              <div className="mb-2">
                <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                <div className="text-brand-600 font-medium">{exp.company}</div>
                <div className="text-sm text-slate-500 mt-1">{exp.startDate} - {exp.endDate}</div>
              </div>
              <p className="text-slate-600 whitespace-pre-line">{exp.description}</p>
            </div>
          )) : <p className="text-slate-400 italic">No experience added yet.</p>}
        </div>
      </section>
    </div>
  );
};

// --- MINIMAL TEMPLATE ---
export const MinimalTemplate: React.FC<TemplateProps> = ({ portfolio }) => {
  const { basics, skills, projects, experience } = portfolio;
  return (
    <div className="min-h-full bg-stone-50 text-stone-900 font-serif pb-20 px-8 py-20 max-w-3xl mx-auto shadow-2xl my-10 bg-white">
        <header className="mb-16 text-center">
            <h1 className="text-4xl font-normal mb-2 uppercase tracking-widest">{basics.name}</h1>
            <p className="text-stone-500 italic text-lg">{basics.headline}</p>
            <div className="w-16 h-1 bg-stone-900 mx-auto mt-6"></div>
        </header>

        <section className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-stone-200 pb-2">About</h2>
            <p className="text-stone-700 leading-relaxed">{basics.summary}</p>
        </section>

        <section className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b border-stone-200 pb-2">Work</h2>
            <div className="space-y-8">
                {projects.map(p => (
                    <div key={p.id}>
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-lg">{p.title}</h3>
                            <a href={p.link} className="text-xs underline text-stone-500 hover:text-stone-900">View Project</a>
                        </div>
                        <p className="text-stone-600 text-sm mb-2">{p.description}</p>
                        <div className="text-xs text-stone-400">{p.tags.join(' • ')}</div>
                    </div>
                ))}
            </div>
        </section>
    </div>
  );
};