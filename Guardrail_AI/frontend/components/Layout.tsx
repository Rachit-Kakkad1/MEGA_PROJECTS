
import React from 'react';
import { View, User } from '../types';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  setView: (view: View) => void;
  user: User | null;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, setView, user, onLogout }) => {
  if (!user) return <>{children}</>;

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-neutral-200">
      <Sidebar activeView={activeView} setView={setView} user={user} onLogout={onLogout} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 border-b border-white/[0.05] flex items-center justify-between px-10 bg-[#0a0a0a]/50 backdrop-blur-2xl z-10">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.2em] mb-0.5">Context</span>
              <h1 className="text-sm font-bold text-white uppercase tracking-widest">
                {activeView === 'dashboard' ? 'Infrastructure Health' : 
                 activeView === 'analyzer' ? 'Security Lab' : 
                 activeView === 'results' ? 'Audit Findings' : 
                 activeView === 'projects' ? 'Asset Fleet' :
                 'Automation Hub'}
              </h1>
            </div>
            <div className="h-6 w-px bg-white/5"></div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Active Fleet:</span>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Global Edge</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Secure Cloud Connection</span>
            </div>
            <div className="h-6 w-px bg-white/5"></div>
            <button className="p-2 text-neutral-500 hover:text-white transition-all relative group">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full border border-black scale-0 group-hover:scale-100 transition-transform"></div>
            </button>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#0a0a0a]">
          {children}
        </div>
      </main>
    </div>
  );
};
