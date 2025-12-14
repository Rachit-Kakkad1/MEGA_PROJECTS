import React, { useState, useEffect } from 'react';
import { ViewState, Portfolio, Project, Experience } from './types';
import { Button, Input, Card, TextArea, AIButton, Badge } from './components/UI';
import { ModernTemplate, MinimalTemplate } from './components/PortfolioTemplates';
import { generateContentImprovement, suggestSkills } from './services/geminiService';

// --- INITIAL STATE ---
const INITIAL_PORTFOLIO: Portfolio = {
  id: 'demo-pf-1',
  userId: 'user-1',
  templateId: 'modern',
  themeColor: '#0ea5e9',
  published: false,
  lastUpdated: new Date().toISOString(),
  basics: {
    name: 'Alex Developer',
    headline: 'Full Stack Engineer & UI Enthusiast',
    email: 'alex@example.com',
    location: 'San Francisco, CA',
    summary: 'Passionate developer with 5+ years of experience building scalable web applications. I love clean code and great UX.'
  },
  skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
  projects: [
    {
      id: 'p1',
      title: 'E-Commerce Dashboard',
      description: 'A comprehensive analytics dashboard for online retailers featuring real-time data visualization and inventory management.',
      link: 'https://github.com',
      tags: ['React', 'D3.js', 'Firebase']
    }
  ],
  experience: [
    {
      id: 'e1',
      role: 'Senior Frontend Engineer',
      company: 'TechCorp Inc.',
      startDate: '2021',
      endDate: 'Present',
      description: 'Led the migration of the legacy codebase to React 18. Improved site performance by 40%.'
    }
  ]
};

export default function App() {
  const [view, setView] = useState<ViewState>('LANDING');
  const [portfolio, setPortfolio] = useState<Portfolio>(INITIAL_PORTFOLIO);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'basics' | 'projects' | 'experience' | 'skills' | 'design'>('basics');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pf_data');
    if (saved) {
      try {
        setPortfolio(JSON.parse(saved));
      } catch (e) { console.error("Failed to load portfolio", e); }
    }
  }, []);

  // Save to local storage
  const savePortfolio = () => {
    setIsSaving(true);
    setTimeout(() => {
      const updated = { ...portfolio, lastUpdated: new Date().toISOString() };
      setPortfolio(updated);
      localStorage.setItem('pf_data', JSON.stringify(updated));
      setIsSaving(false);
    }, 800);
  };

  // --- AI HANDLERS ---
  const handleAIEnhance = async (field: string, text: string, type: 'summary' | 'experience' | 'project', id?: string) => {
    if (!text) return;
    
    // Optimistic UI for button loading handled locally in components usually, 
    // but for simplicity we'll just wait here.
    const enhanced = await generateContentImprovement(text, type);
    
    if (field === 'summary') {
      setPortfolio(p => ({ ...p, basics: { ...p.basics, summary: enhanced } }));
    } else if (field === 'project_desc' && id) {
      setPortfolio(p => ({
        ...p,
        projects: p.projects.map(proj => proj.id === id ? { ...proj, description: enhanced } : proj)
      }));
    } else if (field === 'exp_desc' && id) {
      setPortfolio(p => ({
        ...p,
        experience: p.experience.map(exp => exp.id === id ? { ...exp, description: enhanced } : exp)
      }));
    }
  };

  const handleAISuggestSkills = async () => {
    const context = `${portfolio.basics.summary} ${portfolio.projects.map(p => p.description).join(' ')}`;
    const suggestions = await suggestSkills(context);
    // Add only new skills
    const newSkills = suggestions.filter(s => !portfolio.skills.includes(s));
    if (newSkills.length > 0) {
      setPortfolio(p => ({ ...p, skills: [...p.skills, ...newSkills] }));
    }
  };

  // --- RENDER VIEWS ---

  if (view === 'LANDING') {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
                <span className="font-bold text-xl tracking-tight text-slate-900">PORTFOLIOFORGE</span>
            </div>
            <div className="flex gap-4">
                <Button variant="ghost" onClick={() => setView('AUTH')}>Log In</Button>
                <Button onClick={() => setView('AUTH')}>Get Started</Button>
            </div>
        </nav>
        <main className="flex-1 flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
                <Badge className="mb-6 bg-brand-50 text-brand-700 border-brand-200">New: AI Content Architect V2</Badge>
                <h1 className="text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                    Build once. <br/>Own your presence <span className="text-brand-600">everywhere.</span>
                </h1>
                <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                    The professional portfolio builder for developers and designers. 
                    Let AI polish your experience while you focus on the code.
                </p>
                <div className="flex justify-center gap-4">
                    <Button size="lg" onClick={() => setView('AUTH')} className="h-14 px-8 text-lg shadow-xl shadow-brand-200">Start Building Free</Button>
                    <Button size="lg" variant="outline" className="h-14 px-8 text-lg">View Examples</Button>
                </div>
                <div className="mt-20 border rounded-xl shadow-2xl overflow-hidden bg-slate-50">
                    <img src="https://picsum.photos/1200/600" alt="Dashboard Preview" className="opacity-80" />
                </div>
            </div>
        </main>
      </div>
    );
  }

  if (view === 'AUTH') {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <Card className="w-full max-w-md p-8 shadow-xl">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
                    <p className="text-slate-500">Enter your credentials to access your workspace</p>
                </div>
                <div className="space-y-4">
                    <Input label="Email" placeholder="you@example.com" />
                    <Input label="Password" type="password" placeholder="••••••••" />
                    <Button className="w-full" onClick={() => setView('DASHBOARD')}>Sign In</Button>
                </div>
                <div className="mt-6 text-center text-sm text-slate-500">
                    Don't have an account? <span className="text-brand-600 font-semibold cursor-pointer">Sign up</span>
                </div>
            </Card>
        </div>
    );
  }

  if (view === 'PREVIEW_FULL') {
      return (
          <div className="relative">
              <div className="fixed top-4 right-4 z-50 flex gap-2">
                  <Button variant="secondary" onClick={() => setView('EDITOR')}>Back to Editor</Button>
                  <Button onClick={() => window.print()}>Export PDF</Button>
              </div>
              {portfolio.templateId === 'minimal' ? <MinimalTemplate portfolio={portfolio} /> : <ModernTemplate portfolio={portfolio} />}
          </div>
      )
  }

  // --- EDITOR VIEW (Dashboard included implicitly for this SPA flow) ---

  const SidebarItem = ({ id, label, icon }: { id: typeof activeTab, label: string, icon: React.ReactNode }) => (
      <button 
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === id ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'}`}
      >
          {icon}
          {label}
      </button>
  );

  return (
    <div className="h-screen flex bg-white overflow-hidden">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 border-r border-slate-200 bg-white flex flex-col z-10">
            <div className="h-16 flex items-center px-6 border-b border-slate-100">
                <span className="font-bold text-lg text-slate-900 tracking-tight">PORTFOLIOFORGE</span>
            </div>
            
            <div className="p-4 space-y-1 flex-1 overflow-y-auto custom-scrollbar">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2 mt-2">Content</div>
                <SidebarItem id="basics" label="Basics" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
                <SidebarItem id="experience" label="Experience" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
                <SidebarItem id="projects" label="Projects" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>} />
                <SidebarItem id="skills" label="Skills" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} />
                
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2 mt-6">Design</div>
                <SidebarItem id="design" label="Theme & Layout" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>} />
            </div>

            <div className="p-4 border-t border-slate-200">
                <Button variant="outline" className="w-full justify-start text-slate-600 mb-2" onClick={() => setView('PREVIEW_FULL')}>
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    Full Preview
                </Button>
                <Button className="w-full" isLoading={isSaving} onClick={savePortfolio}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </aside>

        {/* EDITOR PANEL */}
        <div className="w-[450px] border-r border-slate-200 bg-slate-50 flex flex-col overflow-y-auto custom-scrollbar shadow-inner z-10">
            <div className="p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6 capitalize">{activeTab} Configuration</h2>
                
                {activeTab === 'basics' && (
                    <div className="space-y-6">
                        <Input 
                            label="Full Name" 
                            value={portfolio.basics.name} 
                            onChange={(e) => setPortfolio({...portfolio, basics: {...portfolio.basics, name: e.target.value}})} 
                        />
                        <Input 
                            label="Professional Headline" 
                            value={portfolio.basics.headline} 
                            onChange={(e) => setPortfolio({...portfolio, basics: {...portfolio.basics, headline: e.target.value}})} 
                        />
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-sm font-medium text-slate-700">Professional Summary</label>
                                <AIButton 
                                    onClick={() => handleAIEnhance('summary', portfolio.basics.summary, 'summary')}
                                    label="Rewrite"
                                />
                            </div>
                            <TextArea 
                                className="h-32" 
                                value={portfolio.basics.summary}
                                onChange={(e) => setPortfolio({...portfolio, basics: {...portfolio.basics, summary: e.target.value}})}
                            />
                        </div>
                        <Input 
                            label="Contact Email" 
                            value={portfolio.basics.email} 
                            onChange={(e) => setPortfolio({...portfolio, basics: {...portfolio.basics, email: e.target.value}})} 
                        />
                        <Input 
                            label="Location" 
                            value={portfolio.basics.location} 
                            onChange={(e) => setPortfolio({...portfolio, basics: {...portfolio.basics, location: e.target.value}})} 
                        />
                    </div>
                )}

                {activeTab === 'projects' && (
                    <div className="space-y-6">
                        {portfolio.projects.map((proj, idx) => (
                            <Card key={proj.id} className="p-4 bg-white shadow-sm border-slate-200">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-semibold text-slate-800">Project #{idx + 1}</h3>
                                    <button 
                                        onClick={() => setPortfolio(p => ({...p, projects: p.projects.filter(x => x.id !== proj.id)}))}
                                        className="text-slate-400 hover:text-red-500"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <Input 
                                        label="Title" 
                                        value={proj.title}
                                        onChange={(e) => setPortfolio(p => ({
                                            ...p, projects: p.projects.map(pr => pr.id === proj.id ? {...pr, title: e.target.value} : pr)
                                        }))}
                                    />
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="text-xs font-semibold text-slate-500 uppercase">Description</label>
                                            <AIButton onClick={() => handleAIEnhance('project_desc', proj.description, 'project', proj.id)} />
                                        </div>
                                        <TextArea 
                                            value={proj.description}
                                            onChange={(e) => setPortfolio(p => ({
                                                ...p, projects: p.projects.map(pr => pr.id === proj.id ? {...pr, description: e.target.value} : pr)
                                            }))}
                                        />
                                    </div>
                                </div>
                            </Card>
                        ))}
                        <Button 
                            variant="outline" 
                            className="w-full border-dashed"
                            onClick={() => setPortfolio(p => ({
                                ...p, projects: [...p.projects, { id: Date.now().toString(), title: 'New Project', description: '', link: '', tags: [] }]
                            }))}
                        >
                            + Add Project
                        </Button>
                    </div>
                )}

                {activeTab === 'skills' && (
                    <div className="space-y-6">
                        <Card className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <label className="block text-sm font-medium text-slate-700">Skills List</label>
                                <AIButton label="Suggest Skills" onClick={handleAISuggestSkills} />
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {portfolio.skills.map(skill => (
                                    <Badge key={skill} onDelete={() => setPortfolio(p => ({...p, skills: p.skills.filter(s => s !== skill)}))}>
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input 
                                    id="new-skill-input"
                                    placeholder="Add a skill..." 
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const val = e.currentTarget.value.trim();
                                            if (val && !portfolio.skills.includes(val)) {
                                                setPortfolio(p => ({...p, skills: [...p.skills, val]}));
                                                e.currentTarget.value = '';
                                            }
                                        }
                                    }}
                                />
                                <Button onClick={() => {
                                    const input = document.getElementById('new-skill-input') as HTMLInputElement;
                                    const val = input.value.trim();
                                    if (val && !portfolio.skills.includes(val)) {
                                        setPortfolio(p => ({...p, skills: [...p.skills, val]}));
                                        input.value = '';
                                    }
                                }}>Add</Button>
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'experience' && (
                   <div className="space-y-6">
                       {portfolio.experience.map((exp, idx) => (
                           <Card key={exp.id} className="p-4 bg-white shadow-sm border-slate-200">
                               <div className="flex justify-between items-start mb-4">
                                   <h3 className="font-semibold text-slate-800">Experience #{idx + 1}</h3>
                                   <button 
                                        onClick={() => setPortfolio(p => ({...p, experience: p.experience.filter(x => x.id !== exp.id)}))}
                                        className="text-slate-400 hover:text-red-500"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                               </div>
                               <div className="space-y-4">
                                   <Input 
                                       label="Role" 
                                       value={exp.role}
                                       onChange={(e) => setPortfolio(p => ({
                                           ...p, experience: p.experience.map(x => x.id === exp.id ? {...x, role: e.target.value} : x)
                                       }))}
                                   />
                                   <Input 
                                       label="Company" 
                                       value={exp.company}
                                       onChange={(e) => setPortfolio(p => ({
                                           ...p, experience: p.experience.map(x => x.id === exp.id ? {...x, company: e.target.value} : x)
                                       }))}
                                   />
                                   <div className="grid grid-cols-2 gap-2">
                                       <Input 
                                            label="Start Date" 
                                            value={exp.startDate}
                                            onChange={(e) => setPortfolio(p => ({
                                                ...p, experience: p.experience.map(x => x.id === exp.id ? {...x, startDate: e.target.value} : x)
                                            }))}
                                        />
                                       <Input 
                                            label="End Date" 
                                            value={exp.endDate}
                                            onChange={(e) => setPortfolio(p => ({
                                                ...p, experience: p.experience.map(x => x.id === exp.id ? {...x, endDate: e.target.value} : x)
                                            }))}
                                        />
                                   </div>
                                   <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="text-xs font-semibold text-slate-500 uppercase">Responsibilities</label>
                                            <AIButton onClick={() => handleAIEnhance('exp_desc', exp.description, 'experience', exp.id)} />
                                        </div>
                                       <TextArea 
                                           value={exp.description}
                                           onChange={(e) => setPortfolio(p => ({
                                               ...p, experience: p.experience.map(x => x.id === exp.id ? {...x, description: e.target.value} : x)
                                           }))}
                                       />
                                   </div>
                               </div>
                           </Card>
                       ))}
                       <Button 
                            variant="outline" 
                            className="w-full border-dashed"
                            onClick={() => setPortfolio(p => ({
                                ...p, experience: [...p.experience, { id: Date.now().toString(), role: 'Role', company: 'Company', startDate: '2023', endDate: 'Present', description: '' }]
                            }))}
                        >
                            + Add Experience
                        </Button>
                   </div>
                )}

                {activeTab === 'design' && (
                    <div className="space-y-6">
                        <Card className="p-4">
                            <label className="block text-sm font-medium text-slate-700 mb-3">Template</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={() => setPortfolio(p => ({...p, templateId: 'modern'}))}
                                    className={`p-3 border rounded-lg text-left transition-all ${portfolio.templateId === 'modern' ? 'border-brand-500 ring-1 ring-brand-500 bg-brand-50' : 'border-slate-200 hover:border-slate-300'}`}
                                >
                                    <div className="font-semibold text-sm">Modern</div>
                                    <div className="text-xs text-slate-500 mt-1">Clean, bold typography with a focus on visuals.</div>
                                </button>
                                <button 
                                    onClick={() => setPortfolio(p => ({...p, templateId: 'minimal'}))}
                                    className={`p-3 border rounded-lg text-left transition-all ${portfolio.templateId === 'minimal' ? 'border-brand-500 ring-1 ring-brand-500 bg-brand-50' : 'border-slate-200 hover:border-slate-300'}`}
                                >
                                    <div className="font-semibold text-sm">Minimal Serif</div>
                                    <div className="text-xs text-slate-500 mt-1">Elegant, editorial style for professionals.</div>
                                </button>
                            </div>
                        </Card>
                        <Card className="p-4">
                            <label className="block text-sm font-medium text-slate-700 mb-3">Accent Color</label>
                            <div className="flex gap-3">
                                {['#0ea5e9', '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#171717'].map(color => (
                                    <button 
                                        key={color}
                                        onClick={() => setPortfolio(p => ({...p, themeColor: color}))}
                                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${portfolio.themeColor === color ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>

        {/* LIVE PREVIEW AREA */}
        <div className="flex-1 bg-slate-100 p-8 overflow-y-auto relative flex justify-center">
            <div className="w-full max-w-[1024px] bg-white shadow-2xl rounded-sm min-h-[800px] overflow-hidden transform scale-95 origin-top transition-all duration-300">
                {portfolio.templateId === 'minimal' ? <MinimalTemplate portfolio={portfolio} /> : <ModernTemplate portfolio={portfolio} />}
            </div>
        </div>
    </div>
  );
}