import React from "react"
import { HomeOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import ThemeToggle from "../ThemeToggle"
import "./styles.css"

interface HeaderPagesProps {
    title: string
}

export const HeaderPages: React.FC<HeaderPagesProps> = ({ title }) => {
    const navigate = useNavigate()

    return (
        <div className="header">
            <div className="home-icon-container">
                <HomeOutlined className="home-icon" onClick={() => navigate("/")} />
            </div>
            <div className="header-text">
                <h2 className="header-title">{title}</h2>
            </div>
            <div className="theme-toggle-container">
                <ThemeToggle />
            </div>
        </div>
    )
}