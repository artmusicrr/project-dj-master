import React from "react"
import { HeaderPages } from "../../components/headerPages"
import { useSelector } from "react-redux"
import "./styles.css"

export const Services = () => {
    const themeMode = useSelector((state: any) => state.theme.mode)

    return (
        <div className="services-container" data-theme={themeMode}>
            <HeaderPages title="SERVIÇOS" />
        </div>
    )
}

export default Services