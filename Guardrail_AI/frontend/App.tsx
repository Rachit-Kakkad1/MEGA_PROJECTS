
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { AnalyzerWorkspace } from './components/AnalyzerWorkspace';
import { ResultsView } from './components/ResultsView';
import { ProjectsView } from './components/ProjectsView';
import { IntegrationsView } from './components/IntegrationsView';
import { Auth } from './components/Auth';
import { LandingPage } from './components/LandingPage';
import { View, ScanResult, User } from './types';
import { analyzeCode, analyzeAPI, analyzeDatabase } from './geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [latestResult, setLatestResult] = useState<ScanResult | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const processResult = (result: any, language: string, code: string) => {
    const scanResult: ScanResult = {
      id: `scan_${Date.now()}`,
      timestamp: new Date().toISOString(),
      language,
      code,
      overallScore: result.overallScore,
      vulnerabilities: result.vulnerabilities.map((v: any) => ({
        ...v,
        id: v.id || Math.random().toString(36).substr(2, 9)
      }))
    };
    setLatestResult(scanResult);
    setCurrentView('results');
  };

  const handleAnalyzeCode = async (code: string, language: string) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeCode(code, language);
      processResult(result, language, code);
    } catch (error) {
      alert("Analysis failed. Check connection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeAPI = async (endpoint: string, method: string, headers: string, body: string) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeAPI(endpoint, method, headers, body);
      processResult(result, 'API Spec', `${method} ${endpoint}\n\nHeaders:\n${headers}\n\nBody:\n${body}`);
    } catch (error) {
      alert("API Analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeDB = async (data: string) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeDatabase(data);
      processResult(result, 'DB Config', data);
    } catch (error) {
      alert("Database Analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  if (currentView === 'landing' && !user) {
    return <LandingPage onGetStarted={() => setCurrentView('login')} onLogin={() => setCurrentView('login')} />;
  }

  if (currentView === 'login' && !user) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'analyzer':
        return (
          <AnalyzerWorkspace 
            onAnalyzeCode={handleAnalyzeCode} 
            onAnalyzeAPI={handleAnalyzeAPI} 
            onAnalyzeDB={handleAnalyzeDB} 
            isLoading={isAnalyzing} 
          />
        );
      case 'results':
        return latestResult ? (
          <ResultsView result={latestResult} onBack={() => setCurrentView('analyzer')} />
        ) : (
          <Dashboard />
        );
      case 'projects':
        return <ProjectsView />;
      case 'integrations':
        return <IntegrationsView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      activeView={currentView === 'results' ? 'analyzer' : currentView} 
      setView={setCurrentView}
      user={user}
      onLogout={handleLogout}
    >
      <div className="animate-fade-in h-full">
        {renderContent()}
      </div>
      
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex flex-col items-center justify-center">
          <div className="w-80 space-y-8 text-center">
            <div className="relative mx-auto w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-white/5 border-t-blue-500 animate-spin"></div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold text-white uppercase tracking-[0.3em] animate-pulse">Scanning Heuristics</span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Evaluating complex semantic patterns via AI</span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
