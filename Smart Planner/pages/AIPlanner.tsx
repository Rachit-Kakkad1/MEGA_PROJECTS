import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { generateProjectPlan } from '../services/geminiService';
import { Task, TaskStatus } from '../types';
import { BrainCircuit, Loader2, ArrowRight, Check, Sparkles } from 'lucide-react';

const AIPlanner: React.FC = () => {
  const { addMultipleTasks, refreshAnalysis } = useProject();
  const [goal, setGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<{ tasks: Partial<Task>[], summary: string } | null>(null);

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    setIsGenerating(true);
    setGeneratedPlan(null);
    try {
      const plan = await generateProjectPlan(goal);
      setGeneratedPlan(plan);
    } catch (e) {
      alert("Failed to generate plan. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApprove = () => {
    if (generatedPlan) {
      const newTasks = generatedPlan.tasks.map((t, idx) => ({
        ...t,
        id: `gen_${Date.now()}_${idx}`,
        status: TaskStatus.TODO,
      } as Task));
      
      addMultipleTasks(newTasks);
      setGeneratedPlan(null);
      setGoal('');
      
      // Trigger background risk analysis update
      setTimeout(() => refreshAnalysis(), 1000);
    }
  };

  return (
    <div className="h-full bg-slate-50 flex flex-col p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full">
        <header className="mb-10 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-indigo-200">
            <BrainCircuit size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">AI Project Planner</h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Describe your project goal, and I'll break it down into actionable tasks, estimate effort, and set priorities.
          </p>
        </header>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 mb-8 transition-all focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
          <div className="relative">
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="E.g., Build a mobile-first e-commerce checkout flow with Stripe integration..."
              className="w-full min-h-[120px] p-4 text-lg text-slate-900 placeholder-slate-400 border-none rounded-lg resize-none focus:ring-0"
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium px-2">Powered by Gemini 2.5</span>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !goal.trim()}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white transition-all
                  ${isGenerating || !goal.trim() ? 'bg-slate-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300'}
                `}
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Generate Plan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {generatedPlan && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Proposed Plan</h2>
              <button 
                onClick={handleApprove}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition-colors"
              >
                <Check size={18} />
                Approve & Add Tasks
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-6">
              <div className="p-4 bg-indigo-50 border-b border-indigo-100">
                <p className="text-indigo-900 font-medium">{generatedPlan.summary}</p>
              </div>
              <div className="divide-y divide-slate-100">
                {generatedPlan.tasks.map((task, idx) => (
                  <div key={idx} className="p-4 hover:bg-slate-50 transition-colors flex gap-4">
                    <div className="mt-1">
                      <div className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-slate-900">{task.title}</h4>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600`}>
                          {task.priority}
                        </span>
                        <span className="text-xs text-slate-400">{task.storyPoints} pts</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{task.description}</p>
                      <div className="flex gap-2">
                        {task.tags?.map(tag => (
                          <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPlanner;
