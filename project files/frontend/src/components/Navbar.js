import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { UserOutlined, LoginOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getDashboardRoute = () => {
    if (!user) return "/";
    if (user.type === "admin") return "/admin-dashboard";
    if (user.isDoctor) return "/doctor-dashboard";
    return "/user-dashboard";
  };

  return (
    <Header style={{ position: 'sticky', top: 0, zIndex: 10, width: '100%' }}>
      <div className="logo" style={{ color: '#fff', fontSize: 20, fontWeight: 600 }}>
        <Link to="/" style={{ color: '#fff' }}>DocSpot</Link>
      </div>
      <Menu theme="dark" mode="horizontal" style={{ float: 'right' }}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>

        {user && (
          <Menu.Item key="dashboard" icon={<UserOutlined />}>
            <Link to={getDashboardRoute()}>Dashboard</Link>
          </Menu.Item>
        )}

        {!user ? (
          <>
            <Menu.Item key="login" icon={<LoginOutlined />}>
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register">Register</Link>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
};

export default Navbar;
