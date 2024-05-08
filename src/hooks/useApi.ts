import axios from "axios"
import { getUserLocalStorage } from "../contexts/AuthProvider/util"

export const api = axios.create({
  baseURL: process.env.REACT_APP_API,
})

api.interceptors.request.use(
  (config) => {
    const user = getUserLocalStorage()
    config.headers.Authorization = user?.token
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
