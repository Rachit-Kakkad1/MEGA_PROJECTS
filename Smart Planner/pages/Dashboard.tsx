import React from 'react';
import { useProject } from '../context/ProjectContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle2, Clock, AlertTriangle, TrendingUp, BrainCircuit } from 'lucide-react';
import { TaskStatus } from '../types';

const Dashboard: React.FC = () => {
  const { tasks, riskAnalysis } = useProject();

  // Calculate Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === TaskStatus.DONE).length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  
  const statusData = [
    { name: 'To Do', value: tasks.filter(t => t.status === TaskStatus.TODO).length, color: '#94a3b8' },
    { name: 'In Progress', value: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length, color: '#3b82f6' },
    { name: 'Review', value: tasks.filter(t => t.status === TaskStatus.REVIEW).length, color: '#eab308' },
    { name: 'Done', value: tasks.filter(t => t.status === TaskStatus.DONE).length, color: '#22c55e' },
  ];

  const priorityData = [
    { name: 'Low', count: tasks.filter(t => t.priority === 'LOW').length },
    { name: 'Medium', count: tasks.filter(t => t.priority === 'MEDIUM').length },
    { name: 'High', count: tasks.filter(t => t.priority === 'HIGH').length },
    { name: 'Critical', count: tasks.filter(t => t.priority === 'CRITICAL').length },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Real-time project insights and AI analysis.</p>
      </header>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Progress</p>
            <h3 className="text-3xl font-bold text-slate-900">{progress}%</h3>
          </div>
          <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Open Tasks</p>
            <h3 className="text-3xl font-bold text-slate-900">{totalTasks - completedTasks}</h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-full text-blue-600">
            <Clock size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Completed</p>
            <h3 className="text-3xl font-bold text-slate-900">{completedTasks}</h3>
          </div>
          <div className="p-3 bg-green-50 rounded-full text-green-600">
            <CheckCircle2 size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">AI Risk Score</p>
            <h3 className={`text-3xl font-bold ${riskAnalysis && riskAnalysis.score > 50 ? 'text-red-600' : 'text-green-600'}`}>
              {riskAnalysis ? riskAnalysis.score : '-'}
            </h3>
          </div>
          <div className={`p-3 rounded-full ${riskAnalysis && riskAnalysis.score > 50 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            <AlertTriangle size={24} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Task Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {statusData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-slate-600">{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Workload by Priority</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      {riskAnalysis && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="text-indigo-600" />
            <h3 className="text-lg font-semibold text-slate-900">AI Risk Assessment</h3>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg mb-4">
            <p className="text-slate-700 leading-relaxed">{riskAnalysis.text}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-900">Suggested Mitigations:</h4>
            <ul className="list-disc list-inside space-y-1">
              {riskAnalysis.suggestions.map((suggestion, idx) => (
                <li key={idx} className="text-sm text-slate-600">{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;