import React from "react"
import { useAuth } from "../../contexts/AuthProvider/useAuth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

export const HeaderProtected = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    auth.logout()
    navigate("/")
  }
  return (
    <div className="header">
      <div className="header-text">
        <h2>Bem-vindo ao painel de administrador</h2>
        <h2>{auth.name}</h2>
      </div>
      <div className="header-btn">
        <FontAwesomeIcon
          icon={faSignOutAlt}
          onClick={handleLogout}
          className="icon"
        />
      </div>
    </div>
  )
}

//export default HeaderProtected
