import React from "react"
import "./login.css"
import { useAuth } from "../../contexts/AuthProvider/useAuth"
import { useNavigate } from "react-router-dom"
import { Col, Row, Form, Input, Button, message } from "antd"
import { HomeOutlined } from "@ant-design/icons"

export const Login = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  async function onfinish(values: { name: string; password: string }) {
    try {
      await auth.authenticate(values.name, values.password)
      navigate("/privada")
    } catch (error) {
      message.error("Invalid username or password")
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "200px",
          marginTop: "20px",
          marginLeft: "20px",
        }}
      >
        <HomeOutlined
          onClick={() => navigate("/")}
          style={{
            fontSize: "20px",
            marginRight: "10px",
            color: "#1890ff",
            cursor: "pointer",
          }}
        />
        <h3>Home</h3>
      </div>
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col span={12}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onfinish}
          >
            <Form.Item label="username" name="name">
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
    </div>
  )
}
