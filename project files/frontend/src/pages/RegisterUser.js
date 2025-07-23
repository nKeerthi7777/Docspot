import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
  setLoading(true);
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', values);
    localStorage.setItem("token", res.data.token);
    message.success("✅ Registered successfully!");
    navigate('/dashboard/user');  // redirect after register
  } catch (error) {
    console.error(error);
    if (error.response?.status === 400) {
      message.error("User already exists");
    } else {
      message.error("❌ Registration failed. Try again.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '50px 20px' }}>
      <h2 style={{ textAlign: 'center' }}>Register at DocSpot</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input placeholder="Your full name" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input type="email" placeholder="example@email.com" />
        </Form.Item>
        <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
          <Input placeholder="Phone number" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="Create a password" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterUser;
