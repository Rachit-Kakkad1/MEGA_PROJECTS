
import React from 'react';
import { MOCK_PROJECTS } from '../constants';

export const ProjectsView: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Managed Projects</h2>
          <p className="text-slate-500 text-sm">Overview of security posture across your organization</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded shadow-lg shadow-blue-900/20 transition-all">
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PROJECTS.map((project) => (
          <div key={project.id} className="bg-[#1a1d23] border border-slate-800/60 rounded-xl p-6 hover:border-slate-700 transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-xl font-bold ${project.healthScore > 70 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {project.healthScore}%
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Health</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
            <p className="text-xs text-slate-500 mb-6 flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              {project.repoCount} Connected Repositories
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#0f1115] rounded-lg p-3 border border-slate-800/40">
                <span className="block text-[8px] text-slate-500 font-bold uppercase mb-1">Critical Issues</span>
                <span className={`text-sm font-bold ${project.criticalIssues > 0 ? 'text-red-400' : 'text-slate-400'}`}>{project.criticalIssues}</span>
              </div>
              <div className="bg-[#0f1115] rounded-lg p-3 border border-slate-800/40">
                <span className="block text-[8px] text-slate-500 font-bold uppercase mb-1">Last Scan</span>
                <span className="text-sm font-bold text-slate-400">2d ago</span>
              </div>
            </div>

            <button className="w-full text-center text-xs font-bold text-slate-400 group-hover:text-blue-400 transition-colors uppercase tracking-widest border border-slate-800 rounded-lg py-2 group-hover:border-blue-500/30">
              Open Dashboard
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
