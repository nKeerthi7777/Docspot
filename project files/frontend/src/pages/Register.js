import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Register on DocSpot</h2>
      <p>Select how you want to register:</p>
      <Button type="primary" onClick={() => navigate('/register/user')} style={{ margin: '10px' }}>
        👤 Register as User
      </Button>
      <Button type="default" onClick={() => navigate('/register/doctor')}>
        🩺 Register as Doctor
      </Button>
    </div>
  );
};

export default Register;
