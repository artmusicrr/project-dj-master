import React from "react"
import { HeaderPages } from "../../components/headerPages"
import { useSelector } from "react-redux"
import "./styles.css"

export const Company = () => {
    const themeMode = useSelector((state: any) => state.theme.mode)

    return (
        <div className="company-container" data-theme={themeMode}>
            <HeaderPages title="Empresa" />
        </div>
    )
}

export default Company