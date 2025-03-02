import React, { createContext, useEffect, useState } from "react"
import { IAuthProvider, IContext, IUser } from "../../types/User"
import { getUserLocalStorage, loginRequest, setUserLocalStorage } from "./util"

export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>()

  useEffect(() => {
    const user = getUserLocalStorage()
    if (user) {
      setUser(user)
    }
  }, [])

  async function authenticate(name: string, password: string) {
    const response = await loginRequest(name, password)
    
    if (!response) {
      throw new Error("Failed to authenticate")
    }

    const payload = { token: response.token, name }
    
    setUser(payload)
    setUserLocalStorage(payload)
  }

  function logout() {
    setUser(null)
    setUserLocalStorage(null)
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
