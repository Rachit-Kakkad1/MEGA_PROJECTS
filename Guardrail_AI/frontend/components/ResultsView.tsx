
import React, { useState } from 'react';
import { ScanResult, Vulnerability, Severity } from '../types';
import { SEVERITY_COLORS } from '../constants';
import { VulnerabilityDetail } from './VulnerabilityDetail';

interface ResultsViewProps {
  result: ScanResult;
  onBack: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, onBack }) => {
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(result.vulnerabilities[0] || null);

  const stats = {
    critical: result.vulnerabilities.filter(v => v.severity === Severity.CRITICAL).length,
    high: result.vulnerabilities.filter(v => v.severity === Severity.HIGH).length,
    medium: result.vulnerabilities.filter(v => v.severity === Severity.MEDIUM).length,
    low: result.vulnerabilities.filter(v => v.severity === Severity.LOW).length,
  };

  return (
    <div className="flex h-full animate-fade-in">
      {/* Left List */}
      <div className="flex-1 flex flex-col border-r border-white/5">
        <div className="p-10 border-b border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-[10px] font-bold text-neutral-500 hover:text-white transition-all uppercase tracking-widest mb-4"
            >
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
              Return to Workspace
            </button>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-1">Fleet Score</span>
                <span className={`text-4xl font-bold ${result.overallScore > 70 ? 'text-emerald-400' : 'text-red-400'}`}>{result.overallScore}%</span>
              </div>
              <div className="h-10 w-px bg-white/5"></div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-red-400">{stats.critical}</span>
                  <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">Crit</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-orange-400">{stats.high}</span>
                  <span className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">High</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-blue-500/5 px-4 py-2 border border-blue-500/10 rounded-xl">
             <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">AI Confidence</span>
             <span className="text-[10px] font-bold text-blue-400 uppercase">94.2%</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {result.vulnerabilities.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-20 text-center opacity-40">
              <svg className="w-16 h-16 text-emerald-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <h3 className="text-lg font-bold text-white mb-2">Immutable Security State</h3>
              <p className="text-xs text-neutral-500 uppercase tracking-widest">No vulnerabilities detected in this context.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.03]">
              {result.vulnerabilities.map((vuln, i) => (
                <button
                  key={vuln.id}
                  onClick={() => setSelectedVuln(vuln)}
                  className={`w-full text-left p-10 transition-all duration-300 relative group animate-slide-up stagger-${(i % 3) + 1} ${
                    selectedVuln?.id === vuln.id 
                      ? 'bg-white/[0.03]' 
                      : 'hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className={`text-sm font-bold tracking-tight transition-colors ${selectedVuln?.id === vuln.id ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                      {vuln.title}
                    </h4>
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-widest ${SEVERITY_COLORS[vuln.severity]}`}>
                      {vuln.severity}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 opacity-40 text-[10px] font-mono group-hover:opacity-100 transition-opacity">
                    <span>LINE {vuln.location.line}</span>
                    <div className="w-1 h-1 rounded-full bg-neutral-500"></div>
                    <span>CONFIDENCE {(vuln.confidence * 100).toFixed(0)}%</span>
                  </div>
                  {selectedVuln?.id === vuln.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Detail */}
      <div className="w-[500px] xl:w-[700px] shrink-0">
        {selectedVuln ? (
          <VulnerabilityDetail vuln={selectedVuln} onClose={() => setSelectedVuln(null)} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-20 text-center opacity-20">
            <svg className="w-12 h-12 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            <p className="text-xs font-bold uppercase tracking-widest">Select a vulnerability for deep inspection</p>
          </div>
        )}
      </div>
    </div>
  );
};
