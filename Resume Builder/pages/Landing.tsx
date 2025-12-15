import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { FileText, Zap, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-white p-1.5 rounded">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">ResumeForge AI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/auth" className="text-sm font-medium text-slate-600 hover:text-slate-900">Log in</Link>
              <Link to="/auth">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero */}
        <div className="bg-white pb-16 pt-20 lg:pt-32 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Build a <span className="text-accent">Recruiter-Ready</span><br />
              Resume in Minutes
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              Stop guessing what ATS algorithms want. Our enterprise-grade AI optimizes your experience, 
              formats your resume perfectly, and helps you land more interviews.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/auth">
                <Button size="lg" className="shadow-lg shadow-blue-500/20">
                  Build My Resume Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="#features">
                <Button variant="outline" size="lg">View Features</Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">No credit card required · ATS Friendly · 100% Free Export</p>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">AI-Powered Optimization</h3>
                <p className="text-slate-600">
                  Our Gemini-powered engine rewrites weak bullet points into impactful, metric-driven achievements.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                 <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">ATS Compliance Guarantee</h3>
                <p className="text-slate-600">
                  Don't get rejected by robots. Our templates are rigorously tested against major Applicant Tracking Systems.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                 <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Real-Time Preview</h3>
                <p className="text-slate-600">
                  See changes instantly. No more "download and check". What you see is exactly what the recruiter gets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 py-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 ResumeForge AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
