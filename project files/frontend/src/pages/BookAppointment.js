import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem("selectedDoctor"));
  const user = JSON.parse(localStorage.getItem("user"));

  const onFinish = async (values) => {
    if (!doctor || !user) {
      message.error("User or Doctor info missing");
      return;
    }

    const formData = new FormData();
    formData.append('date', dayjs(values.date).format('YYYY-MM-DD'));
    formData.append('document', values.document?.file?.originFileObj || "");
    formData.append('doctorInfo', JSON.stringify(doctor));
    formData.append('userInfo', JSON.stringify(user));
    formData.append('status', 'pending');

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/appointment/book', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success("Appointment booked successfully!");
      navigate("/user-dashboard");
    } catch (error) {
      console.error(error);
      message.error("Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto' }}>
      <h2>Book Appointment with {doctor?.fullname}</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Select Appointment Date"
          name="date"
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Upload Document (optional)" name="document">
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Choose File</Button>
          </Upload>
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading} block>
          Book Appointment
        </Button>
      </Form>
    </div>
  );
};

export default BookAppointment;
