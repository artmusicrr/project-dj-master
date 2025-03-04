import React from "react"
import "./styles.css"
import "./theme-variables.css"
import { useSelector } from "react-redux"
import { HeaderProtected } from "../../components/headerProtected"
import SlideControlPanel from "../../components/SlideControlPanel"
import GalleryManager from "../../components/GalleryManager"

export const Privada: React.FC = () => {
  const themeMode = useSelector((state: any) => state.theme.mode);

  return (
    <div className="container-protected" data-theme={themeMode}>
      <HeaderProtected />
      <div className="content-protected">
        <div className="body-container">
          <div className="body-left">
            <SlideControlPanel />
          </div>
          <div className="body-right">
            <GalleryManager />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privada
