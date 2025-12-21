
import React, { useState } from 'react';

interface APISecurityViewProps {
  onAnalyze: (endpoint: string, method: string, headers: string, body: string) => void;
  isLoading: boolean;
}

export const APISecurityView: React.FC<APISecurityViewProps> = ({ onAnalyze, isLoading }) => {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('https://api.Guardrail-core.com/v1/user/profile');
  const [headers, setHeaders] = useState('{\n  "Authorization": "Bearer <token>",\n  "Content-Type": "application/json"\n}');
  const [body, setBody] = useState('{\n  "user_id": 1024,\n  "role": "admin"\n}');

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">API Security Testing</h2>
        <p className="text-slate-500 text-sm">Audit endpoints against OWASP API Security Top 10 patterns.</p>
      </div>

      <div className="bg-[#1a1d23] border border-slate-800/60 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800/60 bg-slate-900/40 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <select 
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs font-bold text-blue-400 rounded-lg px-4 py-2.5 outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer uppercase"
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
              <option>PATCH</option>
            </select>
            <input 
              type="text" 
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-300 outline-none focus:border-blue-500/50 transition-all font-mono"
              placeholder="Enter API endpoint URL..."
            />
          </div>
          <button 
            onClick={() => onAnalyze(endpoint, method, headers, body)}
            disabled={isLoading || !endpoint}
            className="ml-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 px-6 py-2.5 rounded-lg text-xs font-bold text-white uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20"
          >
            {isLoading ? (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            )}
            Run Security Test
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-slate-800/60 h-[400px]">
          <div className="flex flex-col">
            <div className="px-6 py-3 border-b border-slate-800/60 bg-slate-900/20">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">HTTP Headers</span>
            </div>
            <textarea 
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              className="flex-1 bg-transparent p-6 text-xs font-mono text-slate-400 outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>
          <div className="flex flex-col">
            <div className="px-6 py-3 border-b border-slate-800/60 bg-slate-900/20">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Request Body (JSON)</span>
            </div>
            <textarea 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="flex-1 bg-transparent p-6 text-xs font-mono text-slate-400 outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Auth Context', desc: 'Broken Object Level Authorization checks.' },
          { title: 'Injection', desc: 'SQL, NoSQL, and Command Injection vectors.' },
          { title: 'Rate Limiting', desc: 'Lack of Resources and Rate Limiting assessment.' }
        ].map((item, i) => (
          <div key={i} className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
            <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">{item.title}</h4>
            <p className="text-xs text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
