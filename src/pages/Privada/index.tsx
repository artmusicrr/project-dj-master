import { Button, Form } from "antd"
import React from "react"
import { useAuth } from "../../contexts/AuthProvider/useAuth"

export const Privada = () => {
  const auth = useAuth()

  function handleLogout() {
    auth.logout()
  }

  return (
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <h1>Bem-vindo</h1>
      <h1>{auth.name}</h1>
      <Button type="primary" htmlType="submit" onClick={handleLogout}>
        Sign Out
      </Button>
    </Form.Item>
  )
}

export default Privada
