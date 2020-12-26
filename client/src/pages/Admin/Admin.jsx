import React, { Component } from "react";
import { Button } from "antd";
import Products from "./Products/Products";
import AddProduct from "./Products/AddProduct";
import { UserContext } from "../../context/UserContext";
import Orders from "./Orders/Orders";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  static contextType = UserContext;

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }

  render() {
    const { page } = this.context;
    return (
      <>
        {page === "products" ? (
          <>
            <Button type="primary" onClick={() => this.setModalVisible(true)}>
              {" "}
              Add Product{" "}
            </Button>
            <AddProduct
              modalVisible={this.state.modalVisible}
              setModalVisible={() => this.setModalVisible()}
            />
            <Products />
          </>
        ) : page === "orders" ? (
          <Orders />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default Admin;
