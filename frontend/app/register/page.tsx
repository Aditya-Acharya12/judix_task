"use client"

import { useState } from "react"
import { api } from "@/lib/api"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      await api.post("/auth/register", {
        email,
        password,
      })

      setSuccess("Registration successful. You can now log in.")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      console.error("REGISTER ERROR:", err)

      if (err.response?.status === 400) {
        setError("Email already exists")
      } else {
        setError("Something went wrong")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-slate-900 mb-2">
              Create an account
            </h1>
            <p className="text-sm text-slate-600">
              Get started with your free account
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md
                           text-slate-900 placeholder:text-slate-500
                           focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md
                           text-slate-900 placeholder:text-slate-500
                           focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Confirm password
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md
                           text-slate-900 placeholder:text-slate-500
                           focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                required
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

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-2.5 rounded-md font-medium
                         hover:bg-slate-800 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Create account
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-slate-900 font-medium hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
