import React, { useState } from 'react';
import { Trash2, Edit2, Calendar, AlertCircle, ChevronDown, ChevronUp, Sparkles, CheckCircle2, Circle } from 'lucide-react';
import { Task, SubTask } from '../types';

interface TaskCardProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onToggleStatus, 
  onDelete, 
  onEdit,
  onToggleSubtask 
}) => {
  const [expanded, setExpanded] = useState(false);

  const isCompleted = task.status === 'completed';
  const priorityColor = {
    low: 'bg-emerald-100 text-emerald-700',
    medium: 'bg-amber-100 text-amber-700',
    high: 'bg-rose-100 text-rose-700',
  }[task.priority];

  const dateStr = new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const isOverdue = new Date(task.dueDate) < new Date() && !isCompleted;

  const completedSubtasks = task.subtasks?.filter(s => s.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <div className={`group bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 ${isCompleted ? 'opacity-75' : ''}`}>
      <div className="flex items-start gap-4">
        <button 
          onClick={() => onToggleStatus(task.id)}
          className={`mt-1 flex-shrink-0 transition-colors ${isCompleted ? 'text-brand-600' : 'text-gray-300 hover:text-brand-500'}`}
        >
          {isCompleted ? <CheckCircle2 size={24} className="fill-brand-50" /> : <Circle size={24} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className={`font-semibold text-gray-900 truncate pr-4 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide ${priorityColor}`}>
              {task.priority}
            </span>
          </div>

          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {task.description || "No description"}
          </p>

          <div className="flex items-center gap-4 mt-4">
            <div className={`flex items-center gap-1.5 text-xs font-medium ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
              <Calendar size={14} />
              {dateStr}
            </div>
            
            {task.category && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                {task.category}
              </div>
            )}

            {totalSubtasks > 0 && (
              <div className="flex items-center gap-2 flex-1 max-w-[100px]">
                <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{completedSubtasks}/{totalSubtasks}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(task)}
            className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Subtasks Section */}
      {task.subtasks && task.subtasks.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-50">
           <button 
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors mb-2"
           >
             {expanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
             {expanded ? 'Hide Subtasks' : `Show Subtasks (${completedSubtasks}/${totalSubtasks})`}
           </button>
           
           {expanded && (
             <div className="space-y-2 pl-2">
               {task.subtasks.map(st => (
                 <div key={st.id} 
                      onClick={() => onToggleSubtask(task.id, st.id)}
                      className="flex items-center gap-3 group/sub cursor-pointer p-1.5 hover:bg-gray-50 rounded-md -ml-1.5"
                  >
                   <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${st.completed ? 'bg-brand-500 border-brand-500' : 'border-gray-300 group-hover/sub:border-brand-400'}`}>
                     {st.completed && <CheckCircle2 size={12} className="text-white" />}
                   </div>
                   <span className={`text-sm ${st.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                     {st.title}
                   </span>
                 </div>
               ))}
             </div>
           )}
        </div>
      )}
    </div>
  );
};
