
import React, { useState } from 'react';
import { Workspace } from './Workspace';
import { APISecurityView } from './APISecurityView';
import { DatabaseSecurityView } from './DatabaseSecurityView';

interface AnalyzerWorkspaceProps {
  onAnalyzeCode: (code: string, language: string) => void;
  onAnalyzeAPI: (endpoint: string, method: string, headers: string, body: string) => void;
  onAnalyzeDB: (data: string) => void;
  isLoading: boolean;
}

export const AnalyzerWorkspace: React.FC<AnalyzerWorkspaceProps> = ({ 
  onAnalyzeCode, onAnalyzeAPI, onAnalyzeDB, isLoading 
}) => {
  const [activeModule, setActiveModule] = useState<'code' | 'api' | 'db'>('code');

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a]">
      {/* Module Selector - Segmented Control */}
      <div className="h-20 border-b border-white/[0.05] flex items-center justify-between px-10 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex items-center gap-8">
          <div className="flex p-1 bg-white/[0.03] border border-white/[0.05] rounded-xl">
            {[
              { id: 'code', label: 'Code Scan', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
              { id: 'api', label: 'API Security', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
              { id: 'db', label: 'DB Integrity', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' }
            ].map((mod) => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id as any)}
                className={`flex items-center gap-2.5 px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeModule === mod.id 
                    ? 'bg-white/10 text-white shadow-xl shadow-black/20' 
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mod.icon} /></svg>
                {mod.label}
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-white/5"></div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Mode:</span>
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Full Heuristic Audit</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-neutral-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
          </button>
        </div>
      </div>

      {/* Viewport for Modules */}
      <div className="flex-1 overflow-hidden relative">
        <div className={`absolute inset-0 transition-all duration-500 transform ${activeModule === 'code' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
          <Workspace onAnalyze={onAnalyzeCode} isLoading={isLoading} />
        </div>
        <div className={`absolute inset-0 transition-all duration-500 transform ${activeModule === 'api' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
          <APISecurityView onAnalyze={onAnalyzeAPI} isLoading={isLoading} />
        </div>
        <div className={`absolute inset-0 transition-all duration-500 transform ${activeModule === 'db' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
          <DatabaseSecurityView onAnalyze={onAnalyzeDB} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};
