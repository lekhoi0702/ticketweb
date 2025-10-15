import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider.jsx'

export default function RequireAuth() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}


