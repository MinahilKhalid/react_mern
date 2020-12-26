import React, { useState } from "react";
import { Layout, Menu } from "antd";
import logo from "../../logo1.png";
import { useUserContext } from "../../context/UserContext";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ContainerOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import "./Admin.css";
import { Link } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";
const { Header, Sider, Content } = Layout;

const Admin = ({ children }) => {
  const { setIsAuthenticated, setUserData, setPage } = useUserContext();
  const [collapsed, setCollapsed] = useState(false);
  const toggleSideNav = () => {
    setCollapsed(!collapsed);
  };
  const changePage = (page) => {
    setPage(page)
  }
  const logout = () => {
    setIsAuthenticated(false);
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.removeItem("api-auth-token");
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <MenuItem>
            <Link to="/">
              <div className="admin-logo">
                <img src={logo} width="180px" />
              </div>
            </Link>
          </MenuItem>
          <Menu.Item key="1" onClick={() => changePage("products")} icon={<AppstoreOutlined />}>
            Products
          </Menu.Item>
          <Menu.Item key="2" onClick={() => changePage("orders")} icon={<ContainerOutlined />}>
            Order
          </Menu.Item>
          <Menu.Item key="3" onClick={() => changePage("users")} icon={<UserOutlined />}>
            Users
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={toggleSideNav} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={toggleSideNav} />
          )}
          <Link to="/">
            <div onClick={logout} style={{ float: "right" }}>
              Logout
            </div>
          </Link>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
