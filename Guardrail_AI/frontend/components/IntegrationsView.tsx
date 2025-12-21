
import React, { useState, useEffect } from 'react';
import { MOCK_REPOS, INTEGRATION_TEMPLATES } from '../constants';
import { Repository } from '../types';

export const IntegrationsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'repos' | 'cicd'>('repos');
  const [activeTemplate, setActiveTemplate] = useState<'githubActions' | 'gitlabCI' | 'jenkins'>('githubActions');
  const [repos, setRepos] = useState<Repository[]>(MOCK_REPOS);
  
  // Modal/Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [newRepoName, setNewRepoName] = useState('');
  const [newRepoProvider, setNewRepoProvider] = useState<'github' | 'gitlab' | 'bitbucket'>('github');
  const [repoVisibility, setRepoVisibility] = useState<'public' | 'private'>('public');
  const [accessToken, setAccessToken] = useState('');
  const [defaultBranch, setDefaultBranch] = useState('main');

  // Notification state
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const toggleAutoScan = (repoId: string) => {
    setRepos(prevRepos => 
      prevRepos.map(repo => 
        repo.id === repoId ? { ...repo, autoScan: !repo.autoScan } : repo
      )
    );
  };

  const deleteRepository = (repoId: string) => {
    if (confirm('Are you sure you want to disconnect this repository?')) {
      setRepos(prev => prev.filter(r => r.id !== repoId));
      setNotification({ message: 'Repository disconnected successfully', type: 'success' });
    }
  };

  const handleAddRepository = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepoName.trim()) return;

    setIsConnecting(true);
    
    // Simulate API call to verify connection
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newRepo: Repository = {
      id: `r_${Date.now()}`,
      name: newRepoName,
      provider: newRepoProvider,
      autoScan: true,
      lastCommit: 'Connected - Initializing scan...'
    };

    setRepos(prev => [newRepo, ...prev]);
    setIsConnecting(false);
    setIsModalOpen(false);
    setNotification({ message: `Successfully connected ${newRepoName}`, type: 'success' });
    
    // Reset form
    setNewRepoName('');
    setAccessToken('');
    setDefaultBranch('main');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-8 right-8 z-[100] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className={`px-6 py-3 rounded-xl border shadow-2xl flex items-center gap-3 ${notification.type === 'success' ? 'bg-emerald-900/20 border-emerald-500 text-emerald-400' : 'bg-red-900/20 border-red-500 text-red-400'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            <span className="text-sm font-bold tracking-tight">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Integrations & Pipelines</h2>
          <p className="text-slate-500 text-sm">Automate security scanning within your development lifecycle</p>
        </div>
        {activeTab === 'repos' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            Connect Repository
          </button>
        )}
      </div>

      <div className="flex border-b border-slate-800/60 mb-6">
        <button 
          onClick={() => setActiveTab('repos')}
          className={`px-6 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === 'repos' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
        >
          Repositories
        </button>
        <button 
          onClick={() => setActiveTab('cicd')}
          className={`px-6 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${activeTab === 'cicd' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
        >
          CI / CD Pipeline
        </button>
      </div>

      {activeTab === 'repos' ? (
        <div className="space-y-6">
          <div className="bg-[#1a1d23] border border-slate-800/60 rounded-xl p-8">
            <h3 className="text-lg font-bold text-white mb-6">Connected Sources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-4 rounded-xl hover:border-slate-600 transition-all text-left">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-black">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </div>
                <div>
                  <span className="block font-bold text-white">GitHub</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Authorized</span>
                </div>
              </button>
              <button className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-4 rounded-xl hover:border-slate-600 transition-all text-left">
                <div className="w-12 h-12 bg-[#FC6D26] rounded-lg flex items-center justify-center text-white">
                   <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="m23.955 13.587-1.342-4.135L12 0 1.387 9.452l-1.342 4.135c-.027.082-.013.173.04.243l12 10.151 11.959-10.151c.054-.07.067-.161.04-.243" /></svg>
                </div>
                <div>
                  <span className="block font-bold text-white">GitLab</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Connect</span>
                </div>
              </button>
              <button className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-4 rounded-xl hover:border-slate-600 transition-all text-left">
                <div className="w-12 h-12 bg-[#205081] rounded-lg flex items-center justify-center text-white font-bold italic text-2xl">B</div>
                <div>
                  <span className="block font-bold text-white">Bitbucket</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Connect</span>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-[#1a1d23] border border-slate-800/60 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800/60 bg-slate-900/20">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Repository Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[800px]">
                <thead className="bg-slate-900/40 text-[10px] uppercase font-bold text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Repository</th>
                    <th className="px-6 py-4">Provider</th>
                    <th className="px-6 py-4">Latest Activity</th>
                    <th className="px-6 py-4">Auto-Scan</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {repos.map(repo => (
                    <tr key={repo.id} className="hover:bg-slate-800/20 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-200 block">{repo.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono tracking-tighter">ID: {repo.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700/50 flex items-center gap-1.5 w-fit">
                          {repo.provider === 'github' && <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>}
                          {repo.provider}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 italic truncate max-w-[200px]">{repo.lastCommit}</td>
                      <td className="px-6 py-4">
                        <button 
                          aria-label={`Toggle auto-scan for ${repo.name}`}
                          onClick={() => toggleAutoScan(repo.id)}
                          className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-blue-500/50 ${repo.autoScan ? 'bg-blue-600' : 'bg-slate-700'}`}
                        >
                          <div className={`absolute top-1 w-3 h-3 rounded-full bg-white shadow-sm transition-all duration-200 ease-in-out ${repo.autoScan ? 'left-6' : 'left-1'}`}></div>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-800 rounded-md transition-all">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          </button>
                          <button 
                            onClick={() => deleteRepository(repo.id)}
                            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2">
            {[
              { id: 'githubActions', name: 'GitHub Actions', icon: 'GA' },
              { id: 'gitlabCI', name: 'GitLab CI', icon: 'GL' },
              { id: 'jenkins', name: 'Jenkins', icon: 'JN' },
            ].map(ci => (
              <button
                key={ci.id}
                onClick={() => setActiveTemplate(ci.id as any)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${activeTemplate === ci.id ? 'bg-blue-600/10 border border-blue-500 text-blue-400' : 'bg-slate-900/40 border border-slate-800/60 text-slate-500 hover:text-slate-300'}`}
              >
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-xs">{ci.icon}</div>
                <span className="font-bold text-sm">{ci.name}</span>
              </button>
            ))}
          </div>
          <div className="lg:col-span-3">
            <div className="bg-[#1a1d23] border border-slate-800/60 rounded-xl overflow-hidden flex flex-col h-[500px]">
              <div className="px-6 py-4 bg-slate-900/40 border-b border-slate-800/60 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Configuration Snippet</span>
                <button 
                   onClick={() => navigator.clipboard.writeText((INTEGRATION_TEMPLATES as any)[activeTemplate])}
                   className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase"
                >
                  Copy Snippet
                </button>
              </div>
              <pre className="flex-1 p-8 text-xs font-mono text-slate-300 bg-[#0f1115] overflow-auto leading-relaxed">
                {(INTEGRATION_TEMPLATES as any)[activeTemplate]}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Connect Repository Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#1a1d23] border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-800/60">
              <div>
                <h3 className="text-lg font-bold text-white">Connect New Repository</h3>
                <p className="text-xs text-slate-500 mt-0.5">Authorize access to allow Sentinel to scan your source code.</p>
              </div>
              <button onClick={() => !isConnecting && setIsModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleAddRepository} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Select Provider</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'github', name: 'GitHub', icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
                      { id: 'gitlab', name: 'GitLab', icon: 'm23.955 13.587-1.342-4.135L12 0 1.387 9.452l-1.342 4.135c-.027.082-.013.173.04.243l12 10.151 11.959-10.151c.054-.07.067-.161.04-.243' },
                      { id: 'bitbucket', name: 'Bitbucket', icon: 'M13.43 2.5a.75.75 0 0 0-.71.51l-4.22 13a.75.75 0 0 0 .71.99h10.58a.75.75 0 0 0 .71-.99l-4.22-13a.75.75 0 0 0-.71-.51H13.43z' }
                    ].map(provider => (
                      <button
                        key={provider.id}
                        type="button"
                        onClick={() => setNewRepoProvider(provider.id as any)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${newRepoProvider === provider.id ? 'bg-blue-600/10 border-blue-500 text-blue-400 shadow-sm' : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d={provider.icon} /></svg>
                        <span className="text-[10px] font-bold uppercase">{provider.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Repository Path</label>
                  <input
                    type="text"
                    required
                    value={newRepoName}
                    onChange={(e) => setNewRepoName(e.target.value)}
                    placeholder="org/repository-name"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder-slate-700"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Default Branch</label>
                  <input
                    type="text"
                    required
                    value={defaultBranch}
                    onChange={(e) => setDefaultBranch(e.target.value)}
                    placeholder="main"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder-slate-700"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Repository Visibility</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setRepoVisibility('public')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all ${repoVisibility === 'public' ? 'bg-emerald-600/10 border-emerald-500 text-emerald-400' : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0010 2.054M9.516 5.514A10.003 10.003 0 003 15.304m3.397 1.13L6 18l.108.061" /></svg>
                      Public
                    </button>
                    <button
                      type="button"
                      onClick={() => setRepoVisibility('private')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all ${repoVisibility === 'private' ? 'bg-orange-600/10 border-orange-500 text-orange-400' : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      Private
                    </button>
                  </div>
                </div>

                {repoVisibility === 'private' && (
                  <div className="col-span-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Personal Access Token</label>
                    <input
                      type="password"
                      required={repoVisibility === 'private'}
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      placeholder="••••••••••••••••••••••••"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder-slate-700"
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  disabled={isConnecting}
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isConnecting}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-blue-900/20 transition-all disabled:bg-slate-800 disabled:text-slate-600 flex items-center justify-center gap-2"
                >
                  {isConnecting ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Verifying...
                    </>
                  ) : (
                    'Connect Repository'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
