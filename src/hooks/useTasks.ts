import { useState, useEffect } from "react";
import type {Task, Status } from "../types/task"

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem('app_tasks')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('app_tasks', JSON.stringify(tasks))
    }, [tasks])

    const addTask = (title: string, description: string, priority: Task['priority']) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            description,
            priority,
            status: 'TODO',
            createdAt: new Date().toLocaleDateString(),
        }
        setTasks(prev => [newTask, ...prev])
    }

    const updateTaskStatus = (id: string, newStatus: Status) => {
        setTasks(prev => prev.map(task => (task.id === id ? { ...task, status: newStatus} : task)))
    }

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id))
    }

    return { tasks, addTask, updateTaskStatus, deleteTask}
}