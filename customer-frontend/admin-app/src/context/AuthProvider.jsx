import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('authUser')
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('authUser', JSON.stringify(user))
    else localStorage.removeItem('authUser')
  }, [user])

  async function login({ username, password }) {
    const { data } = await api.post('/login/', { username, password })
    if (data?.role !== 'admin') {
      // Not an admin; ensure no tokens are stored
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      throw new Error('NOT_ADMIN')
    }
    localStorage.setItem('accessToken', data.access)
    localStorage.setItem('refreshToken', data.refresh)
    const nextUser = { username: data.username, role: data.role }
    setUser(nextUser)
    window.location.assign('/')
  }

  function logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
    window.location.assign('/login')
  }

  const value = useMemo(() => ({ user, login, logout, isAuthenticated: !!user && user.role === 'admin' }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}


