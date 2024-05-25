import { Button, Form } from "antd"
import React from "react"
import { useAuth } from "../../contexts/AuthProvider/useAuth"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const Privada = () => {
  const auth = useAuth()

  function handleLogout() {
    auth.logout()
  }

  return (
    <Form.Item >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Bem-vindo ao painel de administrador</h1>
        <h1>{auth.name}</h1>
      </div>
      <div style={{display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <ExitToAppIcon onClick={handleLogout} className="icon"/>
      {/* <Button type="primary" htmlType="submit" onClick={handleLogout} >
        Sign Out
      </Button> */}
      </div>
    </Form.Item>
  )
}

export default Privada
