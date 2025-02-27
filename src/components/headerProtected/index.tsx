import React from "react"
import { useAuth } from "../../contexts/AuthProvider/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import "./styles.css"
import { HeaderPages } from "../../components/headerPages"

export const HeaderProtected = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    auth.logout()
    navigate("/")
  }
  return (
    <div className="header">
      <HeaderPages title="" />
      <div className="header-text">
        <h2 className="header-title">Bem-vindo ao painel de administrador !</h2>
        <h2 className="header-user-name">{auth.name}</h2>
      </div>
      {/* <div className="header-btn">
        <FontAwesomeIcon
          icon={faSignOutAlt}
          onClick={handleLogout}
          className="icon"
        />
      </div> */}
    </div>
  )
}
