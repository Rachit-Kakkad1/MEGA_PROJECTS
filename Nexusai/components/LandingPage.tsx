import React from 'react';
import { Button } from './ui/Button';
import { ArrowRight, Check, Zap, Shield, BarChart } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
             <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>
             </div>
             NexusAI
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block">Features</button>
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block">Pricing</button>
            <Button onClick={onStart} size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Build faster with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600">Intelligent Planning</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10">
          NexusAI combines project management with advanced generative AI to turn your ideas into execution plans in seconds.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" onClick={onStart}>
            Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg" onClick={onStart}>
            View Demo
          </Button>
        </div>
        
        {/* Mock UI Image */}
        <div className="mt-16 rounded-xl border border-slate-200 shadow-2xl overflow-hidden bg-slate-50 relative mx-auto max-w-5xl aspect-[16/9] group">
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50">
             <div className="text-center p-8">
               <div className="inline-block p-4 rounded-full bg-brand-100 text-brand-600 mb-4">
                 <Zap size={32} />
               </div>
               <h3 className="text-xl font-bold text-slate-900">Interactive Dashboard Preview</h3>
             </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">AI-Driven Roadmaps</h3>
              <p className="text-slate-500">Stop spending hours on Jira. Tell NexusAI what you want to build, and get a complete roadmap instantly.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <BarChart size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Predictive Analytics</h3>
              <p className="text-slate-500">Identify bottlenecks before they happen with our predictive engine trained on millions of project data points.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Enterprise Security</h3>
              <p className="text-slate-500">SOC2 compliant, SSO ready, and built for scale. Your data is encrypted at rest and in transit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} NexusAI Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};