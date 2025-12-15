import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { ProfileForm, ExperienceForm } from '../components/ResumeForms';
import { ResumePreview } from '../components/ResumePreview';
import { Button } from '../components/Button';
import { suggestSkills } from '../services/geminiService';
import { ArrowLeft, Layout, Download, Save, Sparkles, ChevronRight, Menu, Plus } from 'lucide-react';

type Tab = 'profile' | 'experience' | 'education' | 'skills' | 'optimize';

export const EditorPage: React.FC = () => {
  const { resume, saveResume, dispatch } = useResume();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [jobDesc, setJobDesc] = useState('');
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [isSkillLoading, setIsSkillLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleAnalyzeJob = async () => {
    if (!jobDesc) return;
    setIsSkillLoading(true);
    const currentSkills = resume.skills.map(s => s.items).join(', ');
    const results = await suggestSkills(jobDesc, currentSkills);
    setSuggestedSkills(results);
    setIsSkillLoading(false);
  };

  const NavItem = ({ id, label }: { id: Tab; label: string }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsMobileMenuOpen(false);
      }}
      className={`w-full text-left px-4 py-3 text-sm font-medium border-l-4 transition-colors ${
        activeTab === id
          ? 'border-primary text-primary bg-slate-50'
          : 'border-transparent text-slate-600 hover:bg-slate-50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-screen bg-slate-100 font-sans overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 z-20 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-slate-500 hover:text-slate-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block" />
          <h1 className="text-lg font-bold text-slate-900 hidden sm:block truncate max-w-xs">{resume.title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={saveResume} className="hidden sm:flex">
            <Save className="w-4 h-4 mr-2" /> Save
          </Button>
          <Button variant="primary" onClick={handlePrint} className="bg-slate-900 hover:bg-slate-800">
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
           <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar - Navigation */}
        <aside className={`
          absolute md:relative z-10 w-64 bg-white border-r border-slate-200 h-full flex flex-col transform transition-transform duration-200 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <nav className="flex-1 py-4 overflow-y-auto">
            <div className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Content</div>
            <NavItem id="profile" label="Personal Details" />
            <NavItem id="experience" label="Work Experience" />
            <NavItem id="education" label="Education" />
            <NavItem id="skills" label="Skills" />
            
            <div className="px-4 mt-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Tools</div>
            <NavItem id="optimize" label="Job Tailoring" />
          </nav>
        </aside>

        {/* Middle - Editor */}
        <div className="w-full md:w-[450px] lg:w-[500px] bg-slate-50 border-r border-slate-200 flex flex-col h-full shrink-0 overflow-y-auto">
           <div className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6 capitalize">{activeTab.replace('-', ' ')}</h2>
              
              {activeTab === 'profile' && <ProfileForm />}
              {activeTab === 'experience' && <ExperienceForm />}
              
              {activeTab === 'education' && (
                <div className="text-center py-10 text-slate-500">
                  <p>Education form placeholder.</p>
                  <p className="text-xs mt-2">Similar structure to Experience form.</p>
                </div>
              )}

              {activeTab === 'skills' && (
                 <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700">Technical Skills</label>
                   {resume.skills.map(skill => (
                     <div key={skill.id} className="mb-4">
                        <input 
                          value={skill.category}
                          className="font-bold text-sm mb-1 bg-transparent border-none focus:ring-0 p-0 w-full"
                          placeholder="Category (e.g. Languages)"
                        />
                        <textarea
                          value={skill.items}
                          onChange={(e) => dispatch({ type: 'UPDATE_SKILL', payload: { id: skill.id, data: { items: e.target.value } } })}
                          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                        />
                     </div>
                   ))}
                   <Button variant="outline" size="sm" onClick={() => dispatch({ type: 'ADD_SKILL', payload: { id: Date.now().toString(), category: 'New Category', items: '' } })}>
                      Add Skill Category
                   </Button>
                 </div>
              )}

              {activeTab === 'optimize' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-800 font-bold mb-2">
                      <Sparkles className="w-5 h-5" />
                      <h3>AI Job Tailoring</h3>
                    </div>
                    <p className="text-sm text-blue-700 mb-4">
                      Paste a job description below. Our Gemini AI will analyze it and suggest missing skills to help you pass the ATS scan.
                    </p>
                    <textarea
                      value={jobDesc}
                      onChange={(e) => setJobDesc(e.target.value)}
                      placeholder="Paste job description here..."
                      className="w-full h-40 rounded-md border-blue-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Button 
                      className="w-full mt-3 bg-blue-600 hover:bg-blue-700" 
                      onClick={handleAnalyzeJob}
                      isLoading={isSkillLoading}
                      disabled={!jobDesc}
                    >
                      Analyze & Suggest Keywords
                    </Button>
                  </div>

                  {suggestedSkills.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-lg p-4 animate-in fade-in slide-in-from-bottom-2">
                      <h4 className="font-bold text-slate-900 mb-2">Missing Keywords Found:</h4>
                      <div className="flex flex-wrap gap-2">
                        {suggestedSkills.map((skill, i) => (
                          <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                            {skill}
                            <button className="hover:text-green-900 ml-1" title="Add to skills">
                              <Plus className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
           </div>
        </div>

        {/* Right - Live Preview */}
        <div className="flex-1 bg-slate-800 overflow-y-auto p-8 flex justify-center hidden lg:flex">
          <div className="scale-[0.85] origin-top">
             <ResumePreview />
          </div>
        </div>

        {/* Mobile Preview Toggle (Hidden on LG) */}
        <div className="lg:hidden absolute bottom-6 right-6 z-30">
           <Link to="/preview" className="bg-primary text-white p-4 rounded-full shadow-xl flex items-center justify-center">
             <Layout className="w-6 h-6" />
           </Link>
        </div>
      </div>
    </div>
  );
};