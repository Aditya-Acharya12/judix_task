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

  // Fetch profile + tasks
  useEffect(() => {
    api.get("/users/me")
      .then((res) => setEmail(res.data.email))
      .catch(() => logout())

    api.get("/tasks")
      .then((res) => setTasks(res.data))
      .catch(console.error)
  }, [])

  // CREATE TASK
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

  // COMPLETE TASK
  const completeTask = async (taskId: string) => {
    await api.patch(`/tasks/${taskId}`)

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, completed: true }
          : task
      )
    )
  }

  // DELETE TASK
  const deleteTask = async (taskId: string) => {
    await api.delete(`/tasks/${taskId}`)
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Logged in as: {email}</p>

      <hr />

      <h2>Tasks</h2>

      <input
        placeholder="New task title"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />

      <br />

      <textarea
        placeholder="Description (optional)"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />

      <br />

      <button onClick={createTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: 12 }}>
            <strong>{task.title}</strong> —{" "}
            {task.completed ? "done" : "pending"}

            {task.description && (
              <p style={{ marginLeft: 10 }}>
                {task.description}
              </p>
            )}

            {!task.completed && (
              <button onClick={() => completeTask(task.id)}>
                Complete
              </button>
            )}

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <br />

      <a href="/profile">Go to Profile</a>

        <br />

      <button onClick={logout}>Logout</button>
    </div>
  )
}
