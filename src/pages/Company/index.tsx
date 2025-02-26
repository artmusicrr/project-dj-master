import React from "react"
import { HomeOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

export const Company = () => {

    const navigate = useNavigate()

    return (
        <div>

            <span>COMPANY</span>
            <div className="home-button">
                <HomeOutlined className="home-icon" onClick={() => navigate("/")} />
            </div>

        </div>
    )
}

export default Company