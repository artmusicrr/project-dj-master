import React from "react"
import { HomeOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { HeaderPages } from "../../components/headerPages"


export const Services = () => {

    const navigate = useNavigate()

    return (
        <div>

            <HeaderPages title="SERVIÇOS" />

        </div>
    )
}

export default Services