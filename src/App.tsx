import React from "react"
import { Link, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { Privada } from "./pages/Privada"
import { ProtectedLayout } from "./components/ProtectedLayout"
import { Login } from "./pages/Login"
import * as Styled from "./styles"
import Form from "./components/form"

function App() {
  return (
    <Styled.Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
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
