
import React from 'react';
import { View, User } from '../types';

interface SidebarProps {
  activeView: View;
  setView: (v: View) => void;
  user: User;
  onLogout: () => void;
}

const SidebarItem: React.FC<{
  view: View;
  activeView: View;
  setView: (v: View) => void;
  label: string;
  icon: React.ReactNode;
}> = ({ view, activeView, setView, label, icon }) => {
  const isActive = activeView === view;
  return (
    <button
      onClick={() => setView(view)}
      className={`group relative flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all duration-300 ${
        isActive 
          ? 'bg-white/[0.05] text-white' 
          : 'text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02]'
      }`}
    >
      <span className={`transition-colors duration-300 ${isActive ? 'text-blue-400' : 'text-neutral-600 group-hover:text-neutral-400'}`}>
        {icon}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
      {isActive && (
        <div className="absolute left-0 top-3 bottom-3 w-1 bg-blue-500 rounded-r-full shadow-[0_0_12px_rgba(59,130,246,0.5)]"></div>
      )}
    </button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setView, user, onLogout }) => {
  return (
    <aside className="w-72 border-r border-white/[0.05] flex flex-col bg-[#0a0a0a] h-screen shrink-0 overflow-y-auto">
      <div className="p-8 pb-12">
        <div className="flex items-center gap-3 mb-16 select-none cursor-pointer" onClick={() => setView('dashboard')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/40">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="font-extrabold text-xl tracking-tighter text-white">SENTINEL</span>
        </div>

        <nav className="space-y-2">
          <div className="px-4 pb-4 text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em]">General</div>
          <SidebarItem view="dashboard" activeView={activeView} setView={setView} label="Insights" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>} />
          <SidebarItem view="analyzer" activeView={activeView} setView={setView} label="Analyzer" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>} />
          
          <div className="px-4 pt-8 pb-4 text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em]">Management</div>
          <SidebarItem view="projects" activeView={activeView} setView={setView} label="Fleet" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>} />
          <SidebarItem view="integrations" activeView={activeView} setView={setView} label="Pipeline" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} />
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-white/[0.05]">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neutral-800 to-neutral-700 border border-white/5 flex items-center justify-center text-sm font-bold text-white">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white truncate w-32">{user.name}</span>
            <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">{user.role}</span>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-[10px] font-bold text-neutral-600 hover:text-red-400 transition-colors uppercase tracking-[0.2em]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Logout Session
        </button>
      </div>
    </aside>
  );
};
