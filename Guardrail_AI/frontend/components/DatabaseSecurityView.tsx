
import React, { useState } from 'react';

interface DatabaseSecurityViewProps {
  onAnalyze: (data: string) => void;
  isLoading: boolean;
}

export const DatabaseSecurityView: React.FC<DatabaseSecurityViewProps> = ({ onAnalyze, isLoading }) => {
  const [data, setData] = useState(`-- Example Insecure SQL Configuration
CREATE USER 'app_admin'@'%' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON *.* TO 'app_admin'@'%';

-- Potential SQL Injection Vector
SELECT * FROM orders WHERE customer_id = '\$userInput';
`);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Database Risk Assessment</h2>
        <p className="text-slate-500 text-sm">Analyze queries, configuration files, and access patterns for security flaws.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#1a1d23] border border-slate-800/60 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[500px]">
            <div className="px-6 py-4 bg-slate-900/40 border-b border-slate-800/60 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Input: SQL Queries / DB Config</span>
              <button 
                onClick={() => onAnalyze(data)}
                disabled={isLoading || !data.trim()}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 px-5 py-2 rounded-lg text-xs font-bold text-white uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/20"
              >
                {isLoading ? (
                  <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                )}
                Analyze DB Data
              </button>
            </div>
            <textarea 
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="flex-1 bg-transparent p-8 text-sm font-mono text-slate-300 outline-none resize-none leading-relaxed placeholder-slate-700"
              spellCheck={false}
              placeholder="Paste SQL queries or configuration blocks here..."
            />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-xl">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Assessment Focus</h4>
            <ul className="space-y-4">
              {[
                { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Hardcoded Credentials' },
                { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Over-privileged Access' },
                { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'SQL Injection Patterns' },
                { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Unencrypted PII Data' }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 bg-blue-600/5 border border-blue-500/20 rounded-xl">
            <p className="text-[10px] text-blue-400 font-bold leading-relaxed">
              Guardrail AI uses advanced semantic analysis to detect subtle privilege escalation paths in complex SQL environments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
