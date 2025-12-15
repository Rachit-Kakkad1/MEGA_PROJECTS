import React from 'react';
import { User } from '../types';
import { 
  LayoutDashboard, 
  Map, 
  BarChart2, 
  Settings as SettingsIcon, 
  LogOut, 
  Menu,
  ChevronLeft
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  user, 
  onLogout, 
  currentPage,
  onNavigate 
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'planning', label: 'AI Planning', icon: Map },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside 
        className={`
          ${sidebarOpen ? 'w-64' : 'w-20'} 
          bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col fixed md:relative z-20 h-full
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>
            </div>
            {sidebarOpen && <span className="font-bold text-lg text-slate-800 whitespace-nowrap">NexusAI</span>}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded hover:bg-slate-100 text-slate-500">
            {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-brand-50 text-brand-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <Icon size={20} className={isActive ? 'text-brand-600' : 'text-slate-400'} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
            <img 
              src={user.avatarUrl || "https://picsum.photos/200"} 
              alt={user.name} 
              className="w-9 h-9 rounded-full bg-slate-200 object-cover"
            />
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            )}
            {sidebarOpen && (
              <button 
                onClick={onLogout}
                className="text-slate-400 hover:text-red-500 transition-colors"
                title="Sign out"
              >
                <LogOut size={18} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full">
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-6 md:px-8">
           <h1 className="text-xl font-semibold text-slate-800 capitalize">
             {navItems.find(i => i.id === currentPage)?.label || 'Dashboard'}
           </h1>
           <div className="flex items-center gap-4">
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">v2.4.0-stable</span>
           </div>
        </header>
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};