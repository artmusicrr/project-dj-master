import React from "react"
import { useAuth } from "../../contexts/AuthProvider/useAuth"
import { Navigate } from "react-router-dom"

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()

  if (!auth.name) {
    return <Navigate to="/login" replace />
  }

  return children
}
