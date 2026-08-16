import React from "react";
import type {Task, Status} from '../types/task'
import { Trash2, ArrowRight, ArrowLeft } from "lucide-react";

interface TaskColumnProps {
    title: string
    status: Status
    tasks: Task[]
    onUpdateStatus: (id: string, status: Status) => void
    onDelete: (id: string) => void
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
    title,
    status,
    tasks,
    onUpdateStatus,
    onDelete,
}) => {
    const getPriorityColor = (p: Task['priority']) => {
        if (p === 'HIGH') return 'bg-red-100 text-red-700 border-red-200'
        if (p === 'MEDIUM') return 'bg-amber-100 text-amber-700 border-amber-200'
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }

    return (
    <div className="bg-slate-100 p-4 rounded-xl flex-1 flex flex-col gap-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <h3 className="font-bold text-slate-800">{title}</h3>
        <span className="bg-white px-2.5 py-0.5 rounded-full text-xs font-bold text-slate-600 border">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto">
        {tasks.map(task => (
          <div key={task.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-slate-900">{task.title}</h4>
              <button onClick={() => onDelete(task.id)} className="text-slate-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {task.description && <p className="text-xs text-slate-600">{task.description}</p>}
            
            <div className="flex justify-between items-center pt-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>

              <div className="flex gap-1">
                {status !== 'TODO' && (
                  <button
                    onClick={() => onUpdateStatus(task.id, status === 'DONE' ? 'IN_PROGRESS' : 'TODO')}
                    className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
                    title="Move Back"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                )}
                {status !== 'DONE' && (
                  <button
                    onClick={() => onUpdateStatus(task.id, status === 'TODO' ? 'IN_PROGRESS' : 'DONE')}
                    className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
                    title="Move Next"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}