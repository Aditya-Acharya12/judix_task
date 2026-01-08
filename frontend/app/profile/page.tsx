"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { logout } from "@/lib/auth"

export default function ProfilePage() {
  const [email, setEmail] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Fetch profile
  useEffect(() => {
    api.get("/users/me")
      .then((res) => {
        setEmail(res.data.email)
        setNewEmail(res.data.email)
      })
      .catch(() => logout())
      .finally(() => setLoading(false))
  }, [])

  // Update profile
  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!newEmail.trim() || newEmail === email) {
      setError("No changes to update")
      return
    }

    try {
      await api.patch("/users/me", {
        email: newEmail,
      })

      setEmail(newEmail)
      setSuccess("Profile updated successfully")
    } catch (err: any) {
      console.error("PROFILE UPDATE ERROR:", err)

      if (err.response?.status === 400) {
        setError("Invalid update request")
      } else {
        setError("Something went wrong")
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Loading profile…
      </div>
    )
  }

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
                href="/dashboard"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Dashboard
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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
              Profile Settings
            </h2>
            <p className="text-sm text-slate-600">
              Manage your account information
            </p>
          </div>

          <form onSubmit={updateProfile} className="space-y-6">
            {/* Current Email */}
            <div className="pb-6 border-b border-slate-200">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current Email
              </label>
              <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-900">
                {email}
              </div>
            </div>

            {/* Update Email */}
            <div>
              <label
                htmlFor="new-email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                New Email Address
              </label>
              <input
                id="new-email"
                type="email"
                placeholder="newemail@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md
                           text-slate-900 placeholder:text-slate-500
                           focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            {success && (
              <p className="text-sm text-green-600">
                {success}
              </p>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-900 text-white rounded-md font-medium
                           hover:bg-slate-800 transition-colors
                           focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                Save Changes
              </button>

              <a
                href="/dashboard"
                className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-md font-medium
                           hover:bg-slate-50 transition-colors
                           focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
