import React from "react"
import "./login.css"
import { useAuth } from "../../contexts/AuthProvider/useAuth"
import { useNavigate } from "react-router-dom"
import { Col, Row, Form, Input, Button, message, Card } from "antd"
import { HomeOutlined, UserOutlined, LockOutlined } from "@ant-design/icons"

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
      <div className="home-button">
        <HomeOutlined
          onClick={() => navigate("/")}
          style={{
            fontSize: "20px",
            color: "#1890ff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        />
      </div>
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Col xs={22} sm={16} md={12} lg={8}>
          <Card
            className="login-card"
            title={
              <div style={{ textAlign: "center" }}>
                <img
                  src="/assets/DJMASTER.png"
                  alt="DJ Master Logo"
                  style={{ width: "150px", marginBottom: "20px" }}
                />
                <h2 style={{ margin: 0, color: "#1890ff" }}>Welcome Back</h2>
              </div>
            }
            bordered={false}
            style={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
            }}
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
                  prefix={<UserOutlined style={{ color: "#1890ff" }} />}
                  placeholder="Enter your username"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: "#1890ff" }} />}
                  placeholder="Enter your password"
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "6px",
                    fontSize: "16px",
                  }}
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
