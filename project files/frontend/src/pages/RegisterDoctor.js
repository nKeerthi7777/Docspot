import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterDoctor = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // 1. Register user
      const userRes = await axios.post('http://localhost:5000/api/auth/register', values);
      const { userId } = userRes.data;

      // 2. Register doctor profile
      await axios.post('http://localhost:5000/api/doctor/register', {
        userId,
        specialization: values.specialization,
        experience: values.experience,
        fee: values.fee,
        availableDays: values.availableDays,
        availableTime: values.availableTime
      });

      message.success("✅ Doctor registered successfully!");
      navigate('/login');
    } catch (err) {
      console.error(err);
      message.error("❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: '50px 20px' }}>
      <h2 style={{ textAlign: 'center' }}>Register as Doctor</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="Specialization" name="specialization" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Experience (in years)" name="experience" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Fee" name="fee" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Available Days (Mon, Tue...)" name="availableDays" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Available Time" name="availableTime" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Register as Doctor
        </Button>
      </Form>
    </div>
  );
};

export default RegisterDoctor;
