import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../../logo.png";
import { UserContext } from "../../../context/UserContext";
import { Layout, Menu } from "antd";
const { SubMenu } = Menu;
const { Header } = Layout;

class WebHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static contextType = UserContext;
  logout = () => {
    const { setIsAuthenticated, setUserData } = this.context;
    setIsAuthenticated(false);
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.removeItem("api-auth-token");
  };
  render() {
    const { isAuthenticated } = this.context;
    return (
      <>
        <Header>
          <Link to="/">
            <div className="logo">
              <img src={logo} width="200px" />
            </div>
          </Link>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="about">
              <Link to="/about">About</Link>
            </Menu.Item>

            <Menu.Item key="contact">
              <Link to="/contact">Contact</Link>
            </Menu.Item>

            {isAuthenticated ? (
              <Menu.Item
                key="sign-up"
                onClick={this.logout}
                style={{ float: "right" }}
              >
                <Link to="/">Logout</Link>
              </Menu.Item>
            ) : (
              <Menu.Item key="sign-in" style={{ float: "right" }}>
                <Link to="/sign-in">Login / Register</Link>
              </Menu.Item>
            )}
          </Menu>
        </Header>
      </>
    );
  }
}

export default WebHeader;
