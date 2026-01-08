"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { logout } from "@/lib/auth"

type Task = {
  id: string
  title: string
  description?: string
  completed: boolean
}

export default function DashboardPage() {
  const [email, setEmail] = useState("")
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [search, setSearch] = useState("")

  // Fetch profile + tasks
  useEffect(() => {
    api.get("/users/me")
      .then((res) => setEmail(res.data.email))
      .catch(() => logout())

    api.get("/tasks")
      .then((res) => setTasks(res.data))
      .catch(console.error)
  }, [])

  // CREATE
  const createTask = async () => {
    if (!newTask.trim()) return

    const res = await api.post("/tasks", {
      title: newTask,
      description: newDescription || null,
    })

    setTasks((prev) => [
      ...prev,
      {
        id: res.data.id,
        title: newTask,
        description: newDescription || undefined,
        completed: false,
      },
    ])

    setNewTask("")
    setNewDescription("")
  }

  // COMPLETE
  const completeTask = async (taskId: string) => {
    await api.patch(`/tasks/${taskId}`)
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    )
  }

  // DELETE
  const deleteTask = async (taskId: string) => {
    await api.delete(`/tasks/${taskId}`)
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-slate-900">
              TaskManager
            </h1>

            <div className="flex items-center gap-4">
              <a
                href="/profile"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Profile
              </a>
              <button
                onClick={logout}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Create Task */}
        <section className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Create New Task
          </h2>

          <div className="space-y-4">
            <input
  placeholder="Task title"
  value={newTask}
  onChange={(e) => setNewTask(e.target.value)}
  className="w-full px-3 py-2 border border-slate-300 rounded-md 
             text-slate-900 placeholder:text-slate-500
             focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
/>

            <textarea
  placeholder="Description (optional)"
  value={newDescription}
  onChange={(e) => setNewDescription(e.target.value)}
  rows={3}
  className="w-full px-3 py-2 border border-slate-300 rounded-md 
             text-slate-900 placeholder:text-slate-500
             focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
/>

            <div className="flex justify-end">
              <button
                onClick={createTask}
                className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800"
              >
                Add Task
              </button>
            </div>
          </div>
        </section>

        {/* Tasks */}
        <section className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Your Tasks
            </h2>

          <input
  type="search"
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-64 px-3 py-2 border border-slate-300 rounded-md 
             text-slate-900 placeholder:text-slate-500 text-sm
             focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
/>
          </div>

          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-start gap-4 p-4 border rounded-md ${
                  task.completed
                    ? "bg-slate-50 border-slate-200"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => !task.completed && completeTask(task.id)}
                  className="mt-1 h-4 w-4 text-slate-900"
                />

                <div className="flex-1">
                  <h3
                    className={`text-sm font-medium ${
                      task.completed
                        ? "line-through text-slate-500"
                        : "text-slate-900"
                    }`}
                  >
                    {task.title}
                  </h3>

                  {task.description && (
                    <p
                      className={`text-sm mt-1 ${
                        task.completed
                          ? "line-through text-slate-400"
                          : "text-slate-600"
                      }`}
                    >
                      {task.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-sm text-slate-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            ))}

            {filteredTasks.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-6">
                No tasks found
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
