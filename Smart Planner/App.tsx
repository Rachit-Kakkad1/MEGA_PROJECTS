import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProjectBoard from './pages/ProjectBoard';
import AIPlanner from './pages/AIPlanner';
import { ProjectProvider } from './context/ProjectContext';

// Simple Auth Component for demo
const AuthScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
          P
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome to PlanAI</h1>
        <p className="text-slate-500 mt-2">The intelligent way to manage projects.</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
          <input type="email" placeholder="demo@planai.com" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors shadow-lg shadow-indigo-200">
          Sign In
        </button>
      </form>
      <p className="text-center text-xs text-slate-400 mt-6">
        By signing in, you agree to our Terms of Service.
      </p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) {
    return <AuthScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'board': return <ProjectBoard />;
      case 'planner': return <AIPlanner />;
      case 'analytics': return <Dashboard />; // Reuse Dashboard for simplicity in demo
      case 'team': return <div className="p-8 text-center text-slate-500">Team Management Module Placeholder</div>;
      default: return <Dashboard />;
    }
  };

  return (
    <ProjectProvider>
      <div className="flex h-screen bg-slate-50 font-sans">
        <Sidebar currentPage={currentPage} setPage={setCurrentPage} />
        <main className="flex-1 overflow-hidden relative">
          {renderPage()}
        </main>
      </div>
    </ProjectProvider>
  );
};

export default App;
