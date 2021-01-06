import React, { Component, useContext } from "react";
import "./SignIn.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import { Redirect } from "react-router-dom";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static contextType = UserContext;

  render() {
    const { userData, setUserData, setIsAuthenticated } = this.context;

    const onFinish = (values) => {
      const body = {
        email: values.email,
        password: values.password,
      };
      axios
        .post("https://heruko-react.herokuapp.com/api/login", body)
        .then((res) => {
          localStorage.setItem("api-auth-token", res.data.token);
          setIsAuthenticated(true);
          setUserData({
            token: res.data.token,
            user: res.data.user,
          });
          if (res.data.user.user_type === "admin") {
            this.props.history.push("/admin");
          } else {
            this.props.history.push("/");
          }
        })
        .catch((err) => {
          console.log("Products API Error: ", err);
        });
    };

    return (
      <Row>
        <Col span={24} offset={8}>
          <h2>Sign In</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot">Forgot password</a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <a>register now!</a>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default SignIn;
