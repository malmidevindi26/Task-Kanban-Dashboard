import { useState } from "react";
import { TaskColumn } from "./components/TaskColumn";
import { TaskForm } from "./components/TaskForm";
import { useTasks } from "./hooks/useTasks";

export default function App() {
  const { tasks, addTask, updateTaskStatus, deleteTask } = useTasks()
  const [search, setSearch] = useState('')

  const filteredTasks = tasks.filter(t => 
    t.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  )

    return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Task Kanban Board</h1>
            <p className="text-slate-500 text-sm mt-1">Manage state transitions and persistent workflows</p>
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          />
        </header>

        <TaskForm onAddTask={addTask} />

        <div className="flex flex-col md:flex-row gap-6">
          <TaskColumn
            title="To Do"
            status="TODO"
            tasks={filteredTasks.filter(t => t.status === 'TODO')}
            onUpdateStatus={updateTaskStatus}
            onDelete={deleteTask}
          />
          <TaskColumn
            title="In Progress"
            status="IN_PROGRESS"
            tasks={filteredTasks.filter(t => t.status === 'IN_PROGRESS')}
            onUpdateStatus={updateTaskStatus}
            onDelete={deleteTask}
          />
          <TaskColumn
            title="Done"
            status="DONE"
            tasks={filteredTasks.filter(t => t.status === 'DONE')}
            onUpdateStatus={updateTaskStatus}
            onDelete={deleteTask}
          />
        </div>
      </div>
    </div>
  );
}