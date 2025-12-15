import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { generateProjectPlan } from '../services/gemini';
import { ProjectPlan } from '../types';
import { Sparkles, Calendar, AlertTriangle, CheckSquare, ArrowRight } from 'lucide-react';

export const Planning: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<ProjectPlan | null>(null);

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    setIsLoading(true);
    try {
      const result = await generateProjectPlan(goal);
      setPlan(result);
    } catch (error) {
      alert("Failed to generate plan. Please check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Sparkles className="text-brand-500" /> AI Project Planner
        </h2>
        <p className="text-slate-500 mt-1">Describe your goal, and our Gemini-powered engine will build a roadmap for you.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="h-full">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700">What do you want to build?</label>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Launch a marketing campaign for a new coffee brand targeting Gen Z..."
                className="w-full h-40 p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none text-sm"
              />
              <Button 
                onClick={handleGenerate} 
                className="w-full" 
                disabled={!goal.trim()} 
                isLoading={isLoading}
              >
                {isLoading ? 'Generating Roadmap...' : 'Generate Plan'}
              </Button>
              <p className="text-xs text-slate-400 text-center">Powered by Google Gemini 2.5 Flash</p>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {plan ? (
            <div className="space-y-6">
              <Card title={plan.projectName} description={plan.estimatedDuration}>
                <p className="text-slate-600 mb-6 bg-slate-50 p-4 rounded-md border border-slate-100">{plan.summary}</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 flex items-center gap-2 mb-3">
                      <Calendar size={18} className="text-brand-500" /> Action Plan
                    </h4>
                    <div className="space-y-3">
                      {plan.tasks.map((task) => (
                        <div key={task.id} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                          <CheckSquare className="text-slate-400 mt-1 shrink-0" size={18} />
                          <div>
                            <div className="font-medium text-slate-900">{task.title}</div>
                            <div className="text-sm text-slate-500">{task.description}</div>
                            {task.dueDate && <div className="text-xs text-brand-600 mt-1 font-medium">Due: {task.dueDate}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {plan.risks && plan.risks.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-slate-900 flex items-center gap-2 mb-3">
                        <AlertTriangle size={18} className="text-amber-500" /> Potential Risks
                      </h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 bg-amber-50 p-4 rounded-md border border-amber-100">
                        {plan.risks.map((risk, idx) => (
                          <li key={idx}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 rounded-lg p-12 bg-slate-50/50">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <Sparkles className="text-brand-400" size={32} />
              </div>
              <h3 className="text-lg font-medium text-slate-900">Ready to plan</h3>
              <p className="text-slate-500 max-w-sm mt-2">
                Enter your project goals on the left to instantly generate a comprehensive project roadmap, task list, and risk assessment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};