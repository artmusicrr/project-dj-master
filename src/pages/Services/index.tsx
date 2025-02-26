import React from "react"
import { HomeOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"


export const Services = () => {

    const navigate = useNavigate()

    return (
        <div>

            <div className="home-button">
                <HomeOutlined className="home-icon" onClick={() => navigate("/")} />
            </div>
            <span>SERVICES</span>

        </div>
    )
}

export default Services