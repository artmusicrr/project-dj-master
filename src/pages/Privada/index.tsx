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
      <Button type="primary" htmlType="submit" onClick={handleLogout}>
        Sign IN
      </Button>
    </Form.Item>
  )
}

export default Privada
