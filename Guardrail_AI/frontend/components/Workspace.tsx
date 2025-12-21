
import React, { useState } from 'react';
import { SAMPLE_CODE } from '../constants';

interface WorkspaceProps {
  onAnalyze: (code: string, language: string) => void;
  isLoading: boolean;
}

export const Workspace: React.FC<WorkspaceProps> = ({ onAnalyze, isLoading }) => {
  const [code, setCode] = useState(SAMPLE_CODE.python);
  const [language, setLanguage] = useState('python');

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode((SAMPLE_CODE as any)[lang] || '');
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="flex flex-col h-full bg-[#0f1115]">
      {/* Editor Controls */}
      <div className="h-12 border-b border-slate-800/60 flex items-center justify-between px-6 bg-[#1a1d23]/50">
        <div className="flex items-center gap-4">
          <div className="flex rounded-md border border-slate-800 p-0.5 bg-slate-900">
            {['python', 'javascript', 'c'].map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded transition-all duration-200 ${
                  language === lang 
                    ? 'bg-slate-700 text-blue-400 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-2">UTF-8 • LF • {lineCount} Lines</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setCode('')}
            className="text-[10px] font-bold text-slate-400 hover:text-slate-200 uppercase tracking-widest px-3 py-1.5 transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={() => onAnalyze(code, language)}
            disabled={isLoading || !code.trim()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 px-4 py-1.5 rounded text-[10px] font-bold text-white uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-3 w-3 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Analyze Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Editor Area */}
      <div className="flex-1 flex overflow-hidden relative group">
        {/* Line Numbers */}
        <div className="w-12 bg-[#0f1115] border-r border-slate-800/40 text-slate-600 text-xs font-mono text-right pr-3 py-4 select-none">
          {Array.from({ length: Math.max(lineCount, 30) }).map((_, i) => (
            <div key={i} className="h-6 leading-6">{i + 1}</div>
          ))}
        </div>
        
        {/* Textarea Input */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="flex-1 bg-transparent text-slate-300 font-mono text-sm leading-6 p-4 outline-none resize-none placeholder-slate-700"
          placeholder="// Paste your code here to begin analysis..."
        />

        {/* Floating Scan Indicator */}
        {!code && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
            <svg className="w-16 h-16 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <p className="text-slate-400 font-medium tracking-wide">Awaiting code input for scanning</p>
          </div>
        )}
      </div>

      {/* Quick Access Sidebar / Tips */}
      <div className="h-10 border-t border-slate-800/60 bg-[#16191e] flex items-center px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
            <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            TIP: ANALYZING FOR SQL INJECTION, BUFFER OVERFLOWS, AND XSS.
          </div>
        </div>
      </div>
    </div>
  );
};
