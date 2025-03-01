import React from "react"
import "./styles.css"

import { HeaderProtected } from "../../components/headerProtected"
import SlideControlPanel from "../../components/SlideControlPanel"
import GalleryManager from "../../components/GalleryManager"

export const Privada: React.FC = () => {

  return (
    <div className="container-protected">
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
