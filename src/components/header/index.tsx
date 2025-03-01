import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./styles.css"
import Form from "../form"

const logo = `${process.env.PUBLIC_URL}/assets/DJMASTER.png`
const hamburgerIcon = `${process.env.PUBLIC_URL}/assets/hamburger.png`
const closeIcon = `${process.env.PUBLIC_URL}/assets/close.png`

const Header: React.FC = () => {
  const [menuActive, setMenuActive] = React.useState(false)
  const [formActive, setFormActive] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const toggleMenu = () => {
    if (!formActive) {
      setMenuActive(!menuActive)
    } else {
      setFormActive(false)
    }
  }

  const toggleForm = () => {
    setFormActive(!formActive)
  }

  const handleNavigate = (path: string) => {
    navigate(path)
    setMenuActive(false)

  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setFormActive(false)
      }
    }

    if (formActive) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [formActive])

  const menuBtnStyle = {
    backgroundImage: `url(${menuActive ? closeIcon : hamburgerIcon})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '30px',
    backgroundPosition: 'center',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    transition: '0.3s ease'
  }


  return (
    <header>
      <a onClick={() => handleNavigate("/")} className="brand">
        <img src={logo} alt="Logo DJ Master" />
      </a>
      <div
        className="menu-btn"
        style={menuBtnStyle}
        onClick={toggleMenu}
      ></div>
      <div
        className={`navigation ${menuActive ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <div className="nav-items">

          <a onClick={() => handleNavigate("/")}>Home</a>
          <a onClick={() => handleNavigate("/services")}>Serviços</a>
          <a onClick={() => handleNavigate("/company")}>Empresa</a>
          <a onClick={() => handleNavigate("/gallery")}>Galeria</a>

          <a
            onClick={(e) => {
              e.preventDefault()
              toggleForm()
            }}
          >
            Contato
          </a>

          <a onClick={() => handleNavigate("/login")}>ADM</a>

        </div>
      </div>
      {formActive && <Form ref={formRef} />}
    </header>
  )
}

export default Header
