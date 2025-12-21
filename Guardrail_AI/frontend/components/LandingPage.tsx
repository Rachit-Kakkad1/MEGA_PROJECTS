
import React from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onLogin }) => {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden selection:bg-blue-500/30">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-glow opacity-60 pointer-events-none"></div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-10 h-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/40">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight text-white">Guardrail<span className="text-blue-500">AI</span></span>
        </div>
        <div className="flex items-center gap-8">
          <a href="#" className="text-xs font-bold text-neutral-500 hover:text-white transition-colors uppercase tracking-widest">Platform</a>
          <a href="#" className="text-xs font-bold text-neutral-500 hover:text-white transition-colors uppercase tracking-widest">Resources</a>
          <button 
            onClick={onLogin}
            className="text-xs font-bold text-white uppercase tracking-widest px-6 py-2 border border-white/10 rounded-full hover:bg-white/5 transition-all"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-10 pt-32 pb-20">
        <div className="max-w-3xl animate-slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8">
            <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse"></span>
            Version 2.0 Now Live
          </div>
          <h1 className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-8">
            The intelligent layer for <span className="text-neutral-500">modern security.</span>
          </h1>
          <p className="text-xl text-neutral-400 leading-relaxed mb-12 max-w-2xl">
            Guardrail AI unifies code analysis, API testing, and database audits into a single, high-performance workspace designed for elite engineering teams.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold text-sm rounded-full hover:bg-neutral-200 transition-all shadow-xl shadow-white/5"
            >
              Get Started for Free
            </button>
            <button className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-white transition-colors">
              View Documentation
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 border-t border-white/5 pt-12 animate-fade-in stagger-2">
          {[
            { label: 'Analysis Accuracy', value: '99.9%', desc: 'Powered by Gemini 3.0' },
            { label: 'Scan Speed', value: '< 2.5s', desc: 'Real-time feedback loop' },
            { label: 'Security Score', value: '+32%', desc: 'Avg. posture improvement' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-2">{stat.label}</span>
              <span className="text-4xl font-bold text-white mb-2">{stat.value}</span>
              <p className="text-xs text-neutral-600 font-medium">{stat.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Decorative Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
    </div>
  );
};
