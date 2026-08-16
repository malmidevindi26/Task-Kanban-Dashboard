import React, {useState} from "react";
import type { Priority } from "../types/task";
import { PlusCircle } from "lucide-react";

interface TaskFormProps {
    onAddTask: (title: string, description: string, priority: Priority) => void
}

export const TaskForm: React.FC<TaskFormProps> = ({onAddTask}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState<Priority>('MEDIUM')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) return
        onAddTask(title, description, priority)
        setTitle('')
        setDescription('')
    }

    return(
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-8 space-y-4">
            <h2 className="font-bold text-slate-800 text-lg">Create New Task</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Short Description..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value as Priority)}
                  className="px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="LOW">Low Priority</option>
                  <option value="MEDIUM">Medium Priority</option>
                  <option value="HIGH">High Priority</option>
                </select>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition"
            >
              <PlusCircle className="w-5 h-5" /> Add Task
            </button>
        </form>
    )
}