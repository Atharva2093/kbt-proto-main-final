'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, AuthContextType } from '@/types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required')
      }
      
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address')
      }
      
      if (password.length < 1) {
        throw new Error('Password is required')
      }
      
      // Simulate API call with small delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Simulate API call
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email,
        firstName: email.split('@')[0],
        lastName: 'User',
        company: 'Acme Engineering',
        createdAt: new Date(),
      }
      setUser(mockUser)
      // Store as JSON (Date will be serialized as ISO string automatically)
      localStorage.setItem('user', JSON.stringify({
        ...mockUser,
        createdAt: mockUser.createdAt.toISOString()
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    company: string
  ) => {
    setIsLoading(true)
    try {
      // Validate inputs
      if (!email || !password || !firstName || !lastName || !company) {
        throw new Error('All fields are required')
      }
      
      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address')
      }
      
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters')
      }
      
      // Simulate API call with small delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Simulate API call
      const newUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email,
        firstName,
        lastName,
        company,
        createdAt: new Date(),
      }
      setUser(newUser)
      // Store as JSON (Date will be serialized as ISO string automatically)
      localStorage.setItem('user', JSON.stringify({
        ...newUser,
        createdAt: newUser.createdAt.toISOString()
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      setUser(null)
      localStorage.removeItem('user')
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true)
    try {
      if (user) {
        const updatedUser = { ...user, ...data }
        setUser(updatedUser)
        // Handle Date serialization
        const userToStore = {
          ...updatedUser,
          createdAt: updatedUser.createdAt instanceof Date 
            ? updatedUser.createdAt.toISOString()
            : updatedUser.createdAt
        }
        localStorage.setItem('user', JSON.stringify(userToStore))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
