import React from "react"
import "./login.css"
import { useAuth } from "../../contexts/AuthProvider/useAuth"
import { useNavigate } from "react-router-dom"
import { Col, Row, Form, Input, Button, message } from "antd"


export const Login = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  async function onfinish(values: { username: string; password: string }) {
    try {
      await auth.authenticate(values.username, values.password)
      navigate("/privada")
    } catch (error) {
      message.error("Invalid username or password")
    }
  }

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        //height: "100vh",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <Col span={12}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onfinish}
        >
          <Form.Item label="username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign IN
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}
