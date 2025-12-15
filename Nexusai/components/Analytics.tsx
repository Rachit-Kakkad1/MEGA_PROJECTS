import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateInsight } from '../services/gemini';
import { Lightbulb } from 'lucide-react';

const serverLatencyData = [
  { time: '00:00', value: 120 },
  { time: '04:00', value: 132 },
  { time: '08:00', value: 450 },
  { time: '12:00', value: 480 },
  { time: '16:00', value: 390 },
  { time: '20:00', value: 210 },
  { time: '23:59', value: 150 },
];

export const Analytics: React.FC = () => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getInsight = async () => {
    setLoading(true);
    const result = await generateInsight('Server Latency (ms)', 480, 'Spike during business hours');
    setInsight(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Advanced Analytics</h2>
        <p className="text-slate-500">Deep dive into system performance and user metrics.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Server Latency (Last 24h)" className="col-span-2">
           <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={serverLatencyData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-100">
             <div>
                <h4 className="text-sm font-semibold text-slate-900">AI Analysis</h4>
                <p className="text-sm text-slate-500 mt-1">
                  {insight || "Click the button to generate an AI analysis of this chart."}
                </p>
             </div>
             <Button onClick={getInsight} isLoading={loading} variant="secondary" size="sm" className="shrink-0 ml-4">
               <Lightbulb size={16} className="mr-2" />
               Analyze
             </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};