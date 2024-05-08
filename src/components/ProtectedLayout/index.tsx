import React from "react"
import { useAuth } from "../../contexts/AuthProvider/useAuth"

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()

  if (!auth.username) {
    return <h1>Você não está logado</h1>
  }

  return children
}
