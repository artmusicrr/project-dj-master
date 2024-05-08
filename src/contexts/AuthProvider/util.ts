import { api } from "../../hooks/useApi"
import { IUser } from "../../types/User"

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("us", JSON.stringify(user))
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("us")

  if (!json) {
    return null
  }
  const user = JSON.parse(json)
  return user ?? null
}

export async function loginRequest(username: string, password: string) {
  try {
    const request = await api.post("login", { username, password })

    return request.data
  } catch (error) {
    return null
  }
}
