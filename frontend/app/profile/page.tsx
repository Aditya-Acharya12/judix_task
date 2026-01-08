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
  const updateProfile = async () => {
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
    return <p style={{ padding: 40 }}>Loading...</p>
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Profile</h1>

      <p>
        <strong>Current email:</strong> {email}
      </p>

      <br />

      <input
        placeholder="Update email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />

      <br />

      <button onClick={updateProfile}>Update Profile</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <br />
      <br />

      <button onClick={logout}>Logout</button>
    </div>
  )
}
