import React from 'react';
import { Card } from './ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, CheckCircle, TrendingUp, AlertCircle, Clock } from 'lucide-react';

const data = [
  { name: 'Mon', tasks: 40, active: 24 },
  { name: 'Tue', tasks: 30, active: 13 },
  { name: 'Wed', tasks: 20, active: 58 },
  { name: 'Thu', tasks: 27, active: 39 },
  { name: 'Fri', tasks: 18, active: 48 },
  { name: 'Sat', tasks: 23, active: 38 },
  { name: 'Sun', tasks: 34, active: 43 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
          <p className="text-slate-500">Overview of your team's productivity and project health.</p>
        </div>
        <div className="flex gap-2">
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              System Operational
            </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-slate-500">Total Revenue</div>
            <span className="text-brand-600 bg-brand-50 p-2 rounded-full"><TrendingUp size={16} /></span>
          </div>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-slate-500">+20.1% from last month</p>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-slate-500">Active Projects</div>
            <span className="text-purple-600 bg-purple-50 p-2 rounded-full"><CheckCircle size={16} /></span>
          </div>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-slate-500">2 pending review</p>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-slate-500">Team Velocity</div>
            <span className="text-amber-600 bg-amber-50 p-2 rounded-full"><Clock size={16} /></span>
          </div>
          <div className="text-2xl font-bold">48 pts</div>
          <p className="text-xs text-slate-500">-4% from last sprint</p>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-slate-500">Active Users</div>
            <span className="text-emerald-600 bg-emerald-50 p-2 rounded-full"><Users size={16} /></span>
          </div>
          <div className="text-2xl font-bold">573</div>
          <p className="text-xs text-slate-500">+201 since last hour</p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4" title="Weekly Overview">
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="tasks" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="col-span-3" title="Recent Activity">
           <div className="space-y-6 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-brand-500 shrink-0"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-slate-900">Project "Titan" Milestone Reached</p>
                  <p className="text-sm text-slate-500">Marked as complete by Sarah. 2 hours ago.</p>
                </div>
              </div>
            ))}
           </div>
           <div className="mt-6 pt-4 border-t border-slate-100">
             <button className="text-sm text-brand-600 hover:text-brand-700 font-medium">View all activity &rarr;</button>
           </div>
        </Card>
      </div>
    </div>
  );
};