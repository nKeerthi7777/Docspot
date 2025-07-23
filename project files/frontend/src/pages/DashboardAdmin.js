import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, message, Spin, Tag } from 'antd';

const DashboardAdmin = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/doctor/pending', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDoctors(res.data);
    } catch (err) {
      message.error("Failed to load doctor applications");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/doctor/status/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      message.success(`Doctor ${newStatus}`);
      fetchDoctors();
    } catch (err) {
      message.error("Status update failed");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h2>Admin Dashboard</h2>
      <h4>Doctor Applications</h4>

      {loading ? (
        <Spin />
      ) : doctors.length === 0 ? (
        <p>No pending doctor applications</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {doctors.map((doc) => (
            <Card
              key={doc._id}
              title={doc.fullname}
              style={{ width: 300 }}
              extra={<Tag color={doc.status === 'pending' ? 'orange' : 'green'}>{doc.status}</Tag>}
            >
              <p>Email: {doc.email}</p>
              <p>Phone: {doc.phone}</p>
              <p>Specialization: {doc.specialization}</p>
              <p>Experience: {doc.experience} years</p>

              {doc.status === 'pending' && (
                <>
                  <Button
                    type="primary"
                    onClick={() => updateStatus(doc._id, 'approved')}
                    style={{ marginRight: 10 }}
                  >
                    Approve
                  </Button>
                  <Button danger onClick={() => updateStatus(doc._id, 'rejected')}>
                    Reject
                  </Button>
                </>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;
