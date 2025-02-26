import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import "./styles.css"
import Form from "../form"

const logo = "/assets/DJMASTER.png"
const iconTitle = "./cd-small.ico"

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
          <a href="#" onClick={(e) => {
            e.preventDefault();
            handleNavigate('/');
          }}>Home</a>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            handleNavigate('/services');
          }}>Serviços</a>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            handleNavigate('/company');
          }}>Empresa</a>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            handleNavigate('/gallery');
          }}>Galeria</a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              toggleForm()
            }}
          >
            Contato
          </a>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            handleNavigate('/login');
          }}>ADM</a>
        </div>
      </div>
      {formActive && <Form ref={formRef} />}
    </header>
  )
}

export default Header
