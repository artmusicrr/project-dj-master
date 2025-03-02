import React from "react"
import "./login.css"
import { useAuth } from "../../contexts/AuthProvider/useAuth"
import { useNavigate } from "react-router-dom"
import { Col, Row, Form, Input, Button, message, Card } from "antd"
import { HomeOutlined, UserOutlined, LockOutlined } from "@ant-design/icons"
import { HeaderPages } from "../../components/headerPages"

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
    <div className="login-container">
      <HeaderPages title="" />
      <Row
        justify="center"
        align="middle"
      >
        <Col xs={22} sm={16} md={12} lg={8}>
          <Card
            className="login-card"
            title={
              <div className="login-card-title">
                <img
                  src="/assets/DJMASTER.png"
                  alt="DJ Master Logo"
                  className="login-card-logo"
                />
                <h2 className="login-card-heading">Welcome Back</h2>
              </div>
            }
            variant="outlined"
          >
            <Form
              name="login"
              onFinish={onfinish}
              layout="vertical"
              size="large"
            >
              <Form.Item
                label="Username"
                name="name"
                rules={[{ required: true, message: "Please input your username!" }]}
              >
                <Input
                  prefix={<UserOutlined className="login-form-icon" />}
                  placeholder="Enter your username"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="login-form-icon" />}
                  placeholder="Enter your password"
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-submit-button"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
