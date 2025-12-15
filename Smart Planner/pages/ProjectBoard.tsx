import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { Task, TaskStatus, Priority } from '../types';
import { MoreHorizontal, Plus, Calendar, AlertCircle } from 'lucide-react';

const ProjectBoard: React.FC = () => {
  const { tasks, moveTask } = useProject();
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const columns = [
    { id: TaskStatus.TODO, title: 'To Do', color: 'bg-slate-200' },
    { id: TaskStatus.IN_PROGRESS, title: 'In Progress', color: 'bg-blue-200' },
    { id: TaskStatus.REVIEW, title: 'Review', color: 'bg-yellow-200' },
    { id: TaskStatus.DONE, title: 'Done', color: 'bg-green-200' },
  ];

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    if (draggedTaskId) {
      moveTask(draggedTaskId, status);
      setDraggedTaskId(null);
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.CRITICAL: return 'text-red-600 bg-red-50 border-red-200';
      case Priority.HIGH: return 'text-orange-600 bg-orange-50 border-orange-200';
      case Priority.MEDIUM: return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      <header className="px-6 py-4 border-b border-slate-200 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Project Board</h1>
          <p className="text-sm text-slate-500">Q3 SaaS Development Sprint</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} />
          New Task
        </button>
      </header>

      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        <div className="flex h-full gap-6 min-w-[1000px]">
          {columns.map((col) => (
            <div 
              key={col.id} 
              className="flex-1 flex flex-col bg-slate-50 rounded-xl border border-slate-200 max-w-xs"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
            >
              <div className="p-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${col.color}`} />
                  <h3 className="font-semibold text-slate-700">{col.title}</h3>
                  <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {tasks.filter(t => t.status === col.id).length}
                  </span>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3 kanban-scroll">
                {tasks.filter(t => t.status === col.id).map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className={`bg-white p-4 rounded-lg border border-slate-200 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow group ${draggedTaskId === task.id ? 'opacity-50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      {task.storyPoints && (
                        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          {task.storyPoints} pts
                        </span>
                      )}
                    </div>
                    
                    <h4 className="text-sm font-semibold text-slate-900 mb-1 leading-tight">{task.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{task.description}</p>
                    
                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {task.tags.map(tag => (
                          <span key={tag} className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="flex -space-x-1.5">
                         {task.assignee ? (
                            <div className="w-6 h-6 rounded-full bg-indigo-100 border border-white flex items-center justify-center text-[10px] font-bold text-indigo-700" title={task.assignee}>
                                {task.assignee[0]}
                            </div>
                         ) : (
                            <div className="w-6 h-6 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                                <Plus size={10} />
                            </div>
                         )}
                      </div>
                      
                      {task.dueDate && (
                        <div className={`flex items-center gap-1 text-xs ${new Date(task.dueDate) < new Date() && task.status !== TaskStatus.DONE ? 'text-red-500 font-medium' : 'text-slate-400'}`}>
                           {new Date(task.dueDate) < new Date() && task.status !== TaskStatus.DONE ? <AlertCircle size={12} /> : <Calendar size={12} />}
                           {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectBoard;
