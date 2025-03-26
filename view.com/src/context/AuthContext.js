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

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          // Verify user still exists in the database
          const freshUserData = await userAPI.getUser(userData.id)
          setUser(freshUserData)
        }
      } catch (err) {
        console.error("Failed to restore user session:", err)
        localStorage.removeItem("user")
      } finally {
        setLoading(false)
      }
    }

    checkLoggedInUser()
  }, [])

  // Register a new user
  const register = async (userData) => {
    try {
      setError(null)
      const newUser = await userAPI.register(userData)
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
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
      localStorage.setItem("user", JSON.stringify(loggedInUser))
      return loggedInUser
    } catch (err) {
      setError(err.message || "Login failed")
      throw err
    }
  }

  // Logout user
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setError(null)
      if (!user) throw new Error("No user logged in")

      const updatedUser = await userAPI.updateUser(user.id, userData)
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
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

