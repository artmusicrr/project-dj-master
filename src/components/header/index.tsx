import React, { useEffect, useRef, useState } from "react"

import "./styles.css"
import Form from "../form"

const logo = "/assets/DJMASTER.png"
const iconTitle = "./cd-small.ico"

const Header: React.FC = () => {
  const [menuActive, setMenuActive] = React.useState(false)
  const [formActive, setFormActive] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

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

  // const closeMenu = () => {
  //   setMenuActive(false)
  // }

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
  return (
    <header>
      <a href="#" className="brand">
        <img src={logo} alt="Logo DJ Master" />
      </a>
      <div
        className={`menu-btn ${menuActive ? "active" : ""}`}
        onClick={toggleMenu}
      ></div>
      <div
        className={`navigation ${menuActive ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <div className="nav-items">
          <a href="#">Home</a>
          <a href="#">Serviços</a>
          <a href="#">Empresa</a>
          <a href="#">Galeria</a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              toggleForm()
            }}
          >
            Contato
          </a>
        </div>
      </div>
      {formActive && <Form ref={formRef} />}
    </header>
  )
}

export default Header
