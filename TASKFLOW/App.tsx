import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { TaskCard } from './components/TaskCard';
import { EditTaskModal } from './components/EditTaskModal';
import { Task, User, Stats } from './types';
import { storage } from './services/storage';
import { getDailyQuote } from './services/ai';
import { Search, SlidersHorizontal, User as UserIcon, LogIn, ArrowRight, CheckSquare, ListTodo } from 'lucide-react';

const App: React.FC = () => {
  // --- State ---
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeView, setActiveView] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [quote, setQuote] = useState<string>("Loading inspiration...");
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');

  // --- Effects ---
  useEffect(() => {
    const loadedUser = storage.getUser();
    if (loadedUser) setUser(loadedUser);
    setTasks(storage.getTasks());
    
    // Fetch Quote
    getDailyQuote().then(setQuote);
  }, []);

  useEffect(() => {
    storage.saveTasks(tasks);
  }, [tasks]);

  // --- Handlers ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginName) return;
    const newUser: User = {
      id: crypto.randomUUID(),
      name: loginName,
      email: loginEmail
    };
    storage.saveUser(newUser);
    setUser(newUser);
  };

  const handleLogout = () => {
    storage.logout();
    setUser(null);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      setTasks(prev => prev.map(t => t.id === editingTask.id ? { ...t, ...taskData } as Task : t));
    } else {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: taskData.title!,
        description: taskData.description,
        priority: taskData.priority || 'medium',
        dueDate: taskData.dueDate!,
        category: taskData.category || 'Personal',
        status: 'todo',
        createdAt: Date.now(),
        subtasks: taskData.subtasks || []
      };
      setTasks(prev => [newTask, ...prev]);
    }
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setTasks(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === 'completed' ? 'todo' : 'completed' } : t
    ));
  };

  const handleToggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId || !t.subtasks) return t;
      return {
        ...t,
        subtasks: t.subtasks.map(s => s.id === subtaskId ? { ...s, completed: !s.completed } : s)
      };
    }));
  };

  // --- Computed Data ---
  const filteredTasks = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    let filtered = [...tasks];

    // View Filtering
    if (activeView === 'today') {
      filtered = filtered.filter(t => t.dueDate.startsWith(today));
    } else if (activeView === 'upcoming') {
      filtered = filtered.filter(t => t.dueDate > today);
    } 

    // Sort: Uncompleted first, then by date
    return filtered.sort((a, b) => {
      if (a.status === 'completed' && b.status !== 'completed') return 1;
      if (a.status !== 'completed' && b.status === 'completed') return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }, [tasks, activeView]);

  const stats: Stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = total - completed;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, pending, completionRate };
  }, [tasks]);

  // --- Render Login ---
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
             <div className="w-16 h-16 bg-brand-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-brand-200">
               <span className="text-white text-2xl font-bold">TF</span>
             </div>
             <h1 className="text-2xl font-bold text-gray-900">Welcome to TaskFlow</h1>
             <p className="text-gray-500 mt-2">Plan, track, and complete your daily goals.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                value={loginName}
                onChange={e => setLoginName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                required
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-200 flex items-center justify-center gap-2 group"
            >
              Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </form>
        </div>
        <p className="mt-8 text-sm text-gray-400">Designed for Productivity</p>
      </div>
    );
  }

  // --- Render Main App ---
  return (
    <div className="min-h-screen bg-[#f8fafc] flex text-gray-900 font-sans">
      <Sidebar 
        activeView={activeView} 
        onChangeView={setActiveView} 
        onLogout={handleLogout}
        onAddTask={() => { setEditingTask(null); setIsModalOpen(true); }}
      />

      <main className="flex-1 min-w-0 overflow-y-auto h-screen">
        {/* Mobile Header */}
        <div className="md:hidden p-4 bg-white border-b border-gray-200 flex justify-between items-center sticky top-0 z-20">
           <span className="font-bold text-lg text-brand-600">TaskFlow</span>
           <button onClick={() => { setEditingTask(null); setIsModalOpen(true); }} className="text-brand-600 font-medium">
             + New
           </button>
        </div>

        <div className="max-w-5xl mx-auto p-4 md:p-10 pb-20">
          
          {/* Header Section */}
          <header className="mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {activeView === 'dashboard' ? `Hello, ${user.name.split(' ')[0]}` : 
                   activeView === 'today' ? "Today's Plan" : 
                   activeView === 'upcoming' ? "Upcoming Tasks" : "All Tasks"}
                </h1>
                <p className="text-gray-500 mt-2 text-lg">
                  {activeView === 'dashboard' ? quote : `${filteredTasks.length} tasks found`}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                 <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm text-gray-500">
                   <UserIcon size={16} />
                   {user.email}
                 </div>
              </div>
            </div>
          </header>

          {/* Dashboard Specific Widgets */}
          {activeView === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl p-6 text-white shadow-lg shadow-brand-200">
                <p className="text-brand-100 font-medium mb-1">Weekly Progress</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold">{stats.completionRate}%</span>
                  <span className="text-brand-200 mb-1">completed</span>
                </div>
                <div className="w-full bg-brand-800/30 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-white h-full rounded-full transition-all duration-1000" style={{ width: `${stats.completionRate}%` }}></div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                    <SlidersHorizontal size={20} />
                  </div>
                  <span className="font-medium text-gray-600">Pending Tasks</span>
                </div>
                <span className="text-3xl font-bold text-gray-900">{stats.pending}</span>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                   <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                    <CheckSquare size={20} />
                  </div>
                  <span className="font-medium text-gray-600">Completed</span>
                </div>
                <span className="text-3xl font-bold text-gray-900">{stats.completed}</span>
              </div>
            </div>
          )}

          {/* Toolbar */}
          {activeView !== 'dashboard' && (
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search tasks..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              {/* Could add detailed filters here */}
            </div>
          )}

          {/* Task Grid */}
          <div className="space-y-4">
             {activeView === 'dashboard' && <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Tasks</h2>}
             
             {filteredTasks.length === 0 ? (
               <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 border-dashed">
                 <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                   <ListTodo size={32} />
                 </div>
                 <h3 className="text-gray-900 font-medium text-lg">No tasks found</h3>
                 <p className="text-gray-500 mt-1">Get started by creating a new task.</p>
                 <button 
                  onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
                  className="mt-4 text-brand-600 font-medium hover:underline"
                 >
                   Create Task
                 </button>
               </div>
             ) : (
               filteredTasks.map(task => (
                 <TaskCard 
                   key={task.id} 
                   task={task} 
                   onToggleStatus={handleToggleStatus} 
                   onDelete={handleDeleteTask}
                   onEdit={(t) => { setEditingTask(t); setIsModalOpen(true); }}
                   onToggleSubtask={handleToggleSubtask}
                 />
               ))
             )}
          </div>

        </div>
      </main>

      <EditTaskModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingTask(null); }}
        onSave={handleSaveTask}
        initialTask={editingTask}
      />
    </div>
  );
};

export default App;