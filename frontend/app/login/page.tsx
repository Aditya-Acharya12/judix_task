"use client"

import { useState } from "react"
import { api } from "@/lib/api"
import { setToken } from "@/lib/auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
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

      // 🔍 TEMP: confirm login success
      console.log("LOGIN SUCCESS:", res.data)

      // Store token (guarded)
      try {
        setToken(res.data.access_token)
      } catch (e) {
        console.error("Token storage failed:", e)
      }

      // Redirect LAST
      window.location.href = "/dashboard"
    } catch (err) {
      console.error("LOGIN FAILED:", err)
      setError("Invalid credentials")
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}