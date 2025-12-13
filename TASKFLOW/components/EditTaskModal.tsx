import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { Task, Priority } from '../types';
import { generateSubtasks } from '../services/ai';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  initialTask?: Task | null;
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, onSave, initialTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Personal');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string[] | null>(null);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setPriority(initialTask.priority);
      setDueDate(initialTask.dueDate.split('T')[0]);
      setCategory(initialTask.category);
    } else {
      resetForm();
    }
  }, [initialTask, isOpen]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate(new Date().toISOString().split('T')[0]);
    setCategory('Personal');
    setAiSuggestion(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData: Partial<Task> = {
      title,
      description,
      priority,
      dueDate: new Date(dueDate).toISOString(),
      category,
      // If new task and AI suggestions exist, add them as subtasks
      subtasks: !initialTask && aiSuggestion ? aiSuggestion.map(t => ({ id: crypto.randomUUID(), title: t, completed: false })) : initialTask?.subtasks
    };
    onSave(taskData);
    onClose();
  };

  const handleAiBreakdown = async () => {
    if (!title) return;
    setIsGenerating(true);
    try {
      const suggestions = await generateSubtasks(title, description);
      setAiSuggestion(suggestions);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl transform transition-all scale-100 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {initialTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add details..."
                rows={3}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none resize-none"
              />
               {/* AI Feature */}
              {!initialTask && (
                <div className="mt-2 flex items-center justify-between">
                   <button
                    type="button"
                    onClick={handleAiBreakdown}
                    disabled={!title || isGenerating}
                    className="text-xs font-medium text-brand-600 flex items-center gap-1 hover:text-brand-700 disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                    {isGenerating ? 'Thinking...' : 'AI Breakdown'}
                  </button>
                  {aiSuggestion && <span className="text-xs text-green-600">{aiSuggestion.length} subtasks generated</span>}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none appearance-none"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Work, Personal"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none"
                />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl font-medium text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all hover:scale-[1.02]"
            >
              {initialTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
