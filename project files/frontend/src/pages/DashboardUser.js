import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const DashboardUser = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/doctor/list', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDoctors(res.data);
    } catch (error) {
      message.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleBook = (doctor) => {
    localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
    navigate('/book-appointment');
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>User Dashboard</h2>
      <h4>Available Doctors</h4>
      {loading ? (
        <Spin />
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {doctors.map((doc) => (
            <Card
              key={doc._id}
              title={doc.fullname}
              bordered
              style={{ width: 300 }}
              extra={<span>{doc.specialization}</span>}
            >
              <p>Email: {doc.email}</p>
              <p>Phone: {doc.phone}</p>
              <p>Experience: {doc.experience} yrs</p>
              <p>Fees: ₹{doc.fees}</p>
              <Button type="primary" onClick={() => handleBook(doc)}>Book Now</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardUser;
