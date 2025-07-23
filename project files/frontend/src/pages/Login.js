import React, { useState } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("user"); // default: user
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Dynamic API endpoint based on role
      const endpoint =
        role === "doctor"
          ? "http://localhost:5000/api/doctor/login"
          : "http://localhost:5000/api/auth/login";

      const res = await axios.post(endpoint, values);
      localStorage.setItem("token", res.data.token);

      message.success("✅ Login successful!");

      // Redirect to appropriate dashboard
      if (res.data.role === "admin") {
        navigate("/dashboard/admin");
      } else if (res.data.role === "doctor") {
        navigate("/dashboard/doctor");
      } else {
        navigate("/dashboard/user");
      }
    } catch (error) {
      console.error(error);
      message.error("❌ Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "50px 20px" }}>
      <h2 style={{ textAlign: "center" }}>Login to DocSpot</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Login As" name="role" initialValue="user">
          <Select value={role} onChange={(value) => setRole(value)}>
            <Option value="user">User</Option>
            <Option value="doctor">Doctor</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input placeholder="you@example.com" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
