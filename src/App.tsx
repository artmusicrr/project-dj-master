import React from "react"
import { Link, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { Privada } from "./pages/Privada"
import { ProtectedLayout } from "./components/ProtectedLayout"
import { Login } from "./pages/Login"
import Gallery from "./pages/Gallery"
import Services from "./pages/Services"
import Company from "./pages/Company"
import * as Styled from "./styles"
// import Galery from "./pages/Gallery"
// import Company from "./pages/Company/index"
// import Services from "./pages/Services/index"

function App() {
  return (
    <Styled.Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
        <Route path="/company" element={<Company />} />

        <Route
          path="/privada"
          element={
            <ProtectedLayout>
              <Privada />
            </ProtectedLayout>
          }
        />
      </Routes>
    </Styled.Container>
  )
}

export default App
