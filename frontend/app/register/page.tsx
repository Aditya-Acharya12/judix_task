"use client"

import { useState } from "react"
import { api } from "@/lib/api"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleRegister = async () => {
    setError("")
    setSuccess("")

    try {
      await api.post("/auth/register", {
        email,
        password,
      })

      setSuccess("Registration successful. You can now log in.")
      setEmail("")
      setPassword("")
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
    <div style={{ padding: 40 }}>
      <h1>Register</h1>

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

      <button onClick={handleRegister}>Register</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  )
}
