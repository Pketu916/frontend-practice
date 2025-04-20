"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { userAPI } from "../http"

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check for user in localStorage on initial load
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (err) {
      console.error("Error loading user from localStorage:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Register a new user
  const register = async (userData) => {
    try {
      setError(null)
      const newUser = await userAPI.register(userData)
      setUser(newUser)
      return newUser
    } catch (err) {
      setError(err.message || "Registration failed")
      throw err
    }
  }

  // Login user
  const login = async (email, password) => {
    try {
      setError(null)
      const loggedInUser = await userAPI.login(email, password)
      setUser(loggedInUser)
      return loggedInUser
    } catch (err) {
      setError(err.message || "Login failed")
      throw err
    }
  }

  // Logout user
  const logout = async () => {
    try {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      setUser(null)
    } catch (err) {
      console.error("Logout error:", err)
      setError(err.message || "Logout failed")
      throw err
    }
  }

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setError(null)
      if (!user) throw new Error("No user logged in")

      const updatedUser = await userAPI.updateUser(user.id, userData)
      setUser(updatedUser)
      return updatedUser
    } catch (err) {
      setError(err.message || "Profile update failed")
      throw err
    }
  }

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
