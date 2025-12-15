import React, { useState, useEffect } from 'react';
import { User } from './types';
import { Auth } from './components/Auth';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Planning } from './components/Planning';
import { Analytics } from './components/Analytics';
import { Settings } from './components/Settings';
import { LandingPage } from './components/LandingPage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [hasStarted, setHasStarted] = useState(false);

  // Check for existing session (mock)
  useEffect(() => {
    const savedUser = localStorage.getItem('nexus_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setHasStarted(true);
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('nexus_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nexus_user');
    setHasStarted(false); // Go back to landing page on logout
    setCurrentPage('dashboard');
  };

  // If not started, show landing page
  if (!hasStarted && !user) {
    return <LandingPage onStart={() => setHasStarted(true)} />;
  }

  // If started but not logged in, show auth
  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  // Authenticated Layout
  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      currentPage={currentPage}
      onNavigate={setCurrentPage}
    >
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'planning' && <Planning />}
      {currentPage === 'analytics' && <Analytics />}
      {currentPage === 'settings' && <Settings />}
    </Layout>
  );
};

export default App;