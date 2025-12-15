import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { useResume } from '../context/ResumeContext';
import { FileText, Plus, Clock, Download, MoreVertical, LogOut } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { resume } = useResume();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="bg-primary text-white p-1.5 rounded">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-slate-900">ResumeForge AI</span>
            </Link>
            <Button variant="ghost" onClick={handleLogout} className="text-slate-500">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Resumes</h1>
            <p className="text-slate-500">Manage your resume versions and exports</p>
          </div>
          <Link to="/editor">
            <Button className="shadow-md">
              <Plus className="w-4 h-4 mr-2" /> Create New Resume
            </Button>
          </Link>
        </div>

        {/* Resume Grid - Mocked to show just the current state as one 'file' */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <div className="h-48 bg-slate-100 border-b border-slate-100 flex items-center justify-center p-8">
               {/* Mini Preview Mock */}
               <div className="w-32 h-full bg-white shadow-sm flex flex-col gap-2 p-2">
                 <div className="h-2 w-20 bg-slate-200 rounded"></div>
                 <div className="h-1 w-16 bg-slate-100 rounded"></div>
                 <div className="space-y-1 mt-2">
                   <div className="h-0.5 w-full bg-slate-100"></div>
                   <div className="h-0.5 w-full bg-slate-100"></div>
                   <div className="h-0.5 w-full bg-slate-100"></div>
                 </div>
               </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                  {resume.title || 'Untitled Resume'}
                </h3>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center text-xs text-slate-500 gap-4 mt-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Edited just now</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  <span>PDF Ready</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                <Link to="/editor" className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full">Edit</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* New Placeholder */}
          <Link to="/editor" className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-primary hover:text-primary hover:bg-slate-50 transition-colors cursor-pointer min-h-[300px]">
            <div className="bg-slate-100 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-medium">Create New Resume</span>
          </Link>
        </div>
      </main>
    </div>
  );
};
