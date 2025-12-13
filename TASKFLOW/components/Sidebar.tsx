import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  Settings, 
  LogOut, 
  PlusCircle,
  ListTodo
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onChangeView: (view: string) => void;
  onLogout: () => void;
  onAddTask: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onChangeView, onLogout, onAddTask }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'all-tasks', icon: ListTodo, label: 'All Tasks' },
    { id: 'today', icon: CheckSquare, label: 'Today' },
    { id: 'upcoming', icon: Calendar, label: 'Upcoming' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">
          TF
        </div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">TaskFlow</h1>
      </div>

      <div className="px-4 mb-8">
        <button 
          onClick={onAddTask}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all shadow-md shadow-brand-200 hover:shadow-lg hover:shadow-brand-300"
        >
          <PlusCircle size={20} />
          New Task
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeView === item.id 
                ? 'bg-brand-50 text-brand-700' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon size={20} className={activeView === item.id ? 'text-brand-600' : 'text-gray-400'} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
