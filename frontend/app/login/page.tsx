"use client"

import { useState } from "react"
import { api } from "@/lib/api"
import { setToken } from "@/lib/auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const formData = new URLSearchParams()
      formData.append("username", email)
      formData.append("password", password)

      const res = await api.post("/auth/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      setToken(res.data.access_token)
      window.location.href = "/dashboard"
    } catch (err) {
      console.error("LOGIN FAILED:", err)
      setError("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-slate-900 mb-2">
              Welcome back
            </h1>
            <p className="text-sm text-slate-600">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
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

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-2.5 rounded-md font-medium 
                         hover:bg-slate-800 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 text-center">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="text-slate-900 font-medium hover:underline"
              >
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}