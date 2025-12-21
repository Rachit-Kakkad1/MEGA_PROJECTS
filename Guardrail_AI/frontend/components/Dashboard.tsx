
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { MOCK_HISTORY } from '../constants';
import { Severity } from '../types';

const data = [
  { name: 'Mon', critical: 2, high: 5, medium: 8, low: 12 },
  { name: 'Tue', critical: 1, high: 4, medium: 12, low: 15 },
  { name: 'Wed', critical: 3, high: 2, medium: 10, low: 18 },
  { name: 'Thu', critical: 0, high: 6, medium: 7, low: 14 },
  { name: 'Fri', critical: 2, high: 3, medium: 9, low: 20 },
  { name: 'Sat', critical: 1, high: 1, medium: 5, low: 8 },
  { name: 'Sun', critical: 0, high: 2, medium: 4, low: 10 },
];

const severityStats = [
  { name: 'Critical', value: 4, color: '#f87171' },
  { name: 'High', value: 12, color: '#fb923c' },
  { name: 'Medium', value: 24, color: '#fbbf24' },
  { name: 'Low', value: 48, color: '#34d399' },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="p-10 space-y-10 max-w-7xl mx-auto animate-fade-in">
      {/* Top Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Health Score Card */}
        <div className="lg:col-span-5 bg-white/[0.03] border border-white/[0.05] rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group premium-hover">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <svg className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h3 className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">System Security Health</h3>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="45" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
              <circle 
                cx="50" cy="50" r="45" 
                fill="transparent" 
                stroke="#3b82f6" 
                strokeWidth="6" 
                strokeDasharray="282.7" 
                strokeDashoffset="70" 
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-bold text-white tracking-tighter">75</span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">A- RATING</span>
            </div>
          </div>
          <p className="mt-8 text-xs text-neutral-400 font-medium">
            Overall posture is <span className="text-emerald-400">+12% better</span> than last month.
          </p>
        </div>

        {/* Distribution Card */}
        <div className="lg:col-span-7 bg-white/[0.03] border border-white/[0.05] rounded-2xl p-8 flex flex-col premium-hover">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">Vulnerability Profile</h3>
            <div className="flex gap-4 text-[9px] font-bold uppercase tracking-widest text-neutral-500">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-400"></div> Crit</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-400"></div> High</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-400"></div> Low</div>
            </div>
          </div>
          <div className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityStats} layout="vertical" margin={{ left: -10, right: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }} 
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={28}>
                  {severityStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Exposure Chart */}
      <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-8 premium-hover">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-1">Exposure Timeline</h3>
            <p className="text-xs text-neutral-500">Historical trend of detected critical vulnerabilities</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold text-neutral-400 hover:text-white transition-all">Week</button>
            <button className="px-4 py-1.5 bg-white text-black rounded-full text-[10px] font-bold transition-all">Month</button>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCrit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#262626" />
              <XAxis dataKey="name" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '12px', fontSize: '10px' }}
              />
              <Area type="monotone" dataKey="critical" stroke="#ef4444" fillOpacity={1} fill="url(#colorCrit)" strokeWidth={3} dot={{ r: 4, fill: '#0a0a0a', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
