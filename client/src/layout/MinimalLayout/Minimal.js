import React from "react";
import "./Minimal.css";
import WebHeader from "./components/Header";
import { Layout } from "antd";
const { Content, Footer } = Layout;

const Minimal = ({ children }) => (
  <>
    <Layout className="layout">
      <WebHeader />
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
      The Bagel Shop ©2020 Developed by Hamna Ashraf <i class="fas fa-heart"></i>
      </Footer>
    </Layout>
  </>
);

export default Minimal;
