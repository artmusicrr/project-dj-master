import React from "react"
import { useAuth } from "../../contexts/AuthProvider/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import "./styles.css"
import ThemeToggle from "../ThemeToggle"

export const HeaderProtected = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    auth.logout()
    navigate("/")
  }

  function handleNavigateHome() {
    navigate("/")
  }

  return (
    <div className="header">
      <div className="home-icon-container">
        <FontAwesomeIcon
          icon={faHome}
          onClick={handleNavigateHome}
          className="home-icon"
        />
      </div>
      <div className="header-text">
        <h2 className="header-title">Painel de Administração</h2>
        <h2 className="header-user-name">Olá, {auth.name}!</h2>
      </div>
      <div className="theme-toggle-container">
        <ThemeToggle />
      </div>
    </div>
  )
}
