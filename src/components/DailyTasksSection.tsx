import React, { useState } from 'react';
import { DailyTask } from '../types';
import {
  ListTodo,
  Plus,
  Trash2,
  CheckCircle,
  Circle,
  Check,
  Sparkles,
} from 'lucide-react';

interface DailyTasksSectionProps {
  tasks: DailyTask[];
  onAddTask: (text: string) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onClearCompletedTasks: () => void;
}

export const DailyTasksSection: React.FC<DailyTasksSectionProps> = ({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onClearCompletedTasks,
}) => {
  const [newTaskText, setNewTaskText] = useState('');

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    onAddTask(newTaskText.trim());
    setNewTaskText('');
  };

  return (
    <div
      id="daily-tasks-section"
      className="bg-white dark:bg-[#152337] rounded-2xl border border-slate-200 dark:border-[#26384D] p-3.5 sm:p-4 shadow-xs"
    >
      {/* Header: Title, Counter & Clear action */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-[#1976D2]/20 border border-slate-300 dark:border-[#1976D2]/35 flex items-center justify-center text-black dark:text-[#42A5F5] shrink-0">
            <ListTodo className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-black text-black dark:text-slate-100">
                مهام ومتابعات اليوم
              </h3>
              {totalCount > 0 && (
                <span className="text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#1B2A3D] text-black dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                  {completedCount} من {totalCount} منجزة
                </span>
              )}
            </div>
          </div>
        </div>

        {completedCount > 0 && (
          <button
            onClick={onClearCompletedTasks}
            className="text-[11px] font-black text-black hover:text-rose-600 transition-colors cursor-pointer"
            title="حذف المهام المكتملة"
          >
            مسح المكتملة
          </button>
        )}
      </div>

      {/* Progress Line (if there are tasks) */}
      {totalCount > 0 && (
        <div className="w-full h-1 bg-slate-200 dark:bg-[#1B2A3D] rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-black dark:bg-[#42A5F5] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* Input Form for Adding New Task */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-3">
        <input
          id="input-daily-task"
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="أضف مهمة لليوم (مثال: تسليم شيك عينات، مراجعة صيدلية، تأكيد ميعاد...)"
          className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:bg-white focus:border-black focus:ring-1 focus:ring-black/20 rounded-xl px-3.5 py-2 text-xs font-black text-black dark:text-slate-100 placeholder:text-slate-600 outline-none transition-all shadow-2xs"
        />
        <button
          id="btn-add-daily-task"
          type="submit"
          disabled={!newTaskText.trim()}
          className="inline-flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl bg-black hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-black transition-all shadow-xs shrink-0 cursor-pointer active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>إضافة</span>
        </button>
      </form>

      {/* Tasks List */}
      {totalCount === 0 ? (
        <div className="py-3 px-3 text-center rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-dashed border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
          لا توجد مهام إضافية مضافة لليوم حتى الآن. أضف مهامك الميدانية هنا لتنظيم يومك.
        </div>
      ) : (
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-0.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className={`flex items-center justify-between gap-2.5 p-2 rounded-xl border transition-all cursor-pointer select-none group ${
                task.isCompleted
                  ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800 text-slate-500'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 hover:border-black text-black dark:text-slate-100 shadow-2xs'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleTask(task.id);
                  }}
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                    task.isCompleted
                      ? 'bg-black text-white'
                      : 'border-2 border-slate-400 dark:border-slate-600 group-hover:border-black'
                  }`}
                >
                  {task.isCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                </button>
                <span
                  className={`text-xs font-black break-words ${
                    task.isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : 'text-black dark:text-slate-100'
                  }`}
                >
                  {task.text}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTask(task.id);
                }}
                className="p-1 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors shrink-0"
                title="حذف المهمة"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
