import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterUser from './pages/RegisterUser';
import RegisterDoctor from './pages/RegisterDoctor';
import Navbar from './components/Navbar';
import DashboardUser from './pages/DashboardUser';
import DashboardDoctor from './pages/DashboardDoctor';
import DashboardAdmin from './pages/DashboardAdmin';
import BookAppointment from './pages/BookAppointment';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/user" element={<RegisterUser />} />
        <Route path="/register/doctor" element={<RegisterDoctor />} />

        {/* Dashboards */}
        <Route path="/dashboard/user" element={<DashboardUser />} />
        <Route path="/dashboard/doctor" element={<DashboardDoctor />} />
        <Route path="/dashboard/admin" element={<DashboardAdmin />} />

        {/* Book appointment */}
        <Route path="/book-appointment" element={<BookAppointment />} />
      </Routes>
    </Router>
  );
};

export default App;
