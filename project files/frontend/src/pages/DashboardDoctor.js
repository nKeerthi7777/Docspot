import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import axios from 'axios';

const DashboardDoctor = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/appointment/doctor", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  if (loading) return <Spin fullscreen />;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Doctor Dashboard</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        appointments.map((appt, index) => (
          <Card key={index} title={`Patient: ${appt.userInfo.name}`} style={{ marginBottom: '10px' }}>
            <p><strong>Phone:</strong> {appt.userInfo.phone}</p>
            <p><strong>Date:</strong> {appt.date}</p>
            <p><strong>Status:</strong> {appt.status}</p>
            {appt.document && (
              <p><a href={`http://localhost:5000/uploads/${appt.document}`} target="_blank" rel="noreferrer">📎 View Document</a></p>
            )}
          </Card>
        ))
      )}
    </div>
  );
};

export default DashboardDoctor;
