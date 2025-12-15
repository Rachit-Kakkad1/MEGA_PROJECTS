import React from 'react';
import { LayoutDashboard, KanbanSquare, BrainCircuit, BarChart3, Users, Settings, PlusSquare } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  setPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setPage }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'board', icon: KanbanSquare, label: 'Board' },
    { id: 'planner', icon: BrainCircuit, label: 'AI Planner', highlight: true },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'team', icon: Users, label: 'Team' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col border-r border-slate-800">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
          P
        </div>
        <span className="text-xl font-bold text-white tracking-tight">PlanAI</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${currentPage === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                : 'hover:bg-slate-800 hover:text-white'
              }
              ${item.highlight && currentPage !== item.id ? 'text-indigo-400 hover:text-indigo-300' : ''}
            `}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
          <Settings size={18} />
          Settings
        </button>
        <div className="mt-4 flex items-center gap-3 px-3">
          <img src="https://i.pravatar.cc/150?u=a" alt="User" className="w-8 h-8 rounded-full ring-2 ring-slate-700" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">Alice Manager</p>
            <p className="text-xs text-slate-500 truncate">alice@company.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
