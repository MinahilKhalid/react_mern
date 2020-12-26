import React, { Component } from "react";
import { Row, Col, List, Input, Button, Divider, message } from "antd";
import "./ProductOverview.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Receipt from "../Receipt/Receipt";

class ProductOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      receipt: null,
      cartButtonValidation: false,
    };
  }
  onQuantityAdd = () => {
    const { quantity } = this.state;
    this.setState({ quantity: quantity + 1 });
  };
  onQuantityMinus = () => {
    const { quantity } = this.state;
    this.setState({ quantity: quantity <= 1 ? 1 : quantity - 1 });
  };
  setAddToCart = () => {
    const { product } = this.props;
    const { quantity } = this.state;
    var order = {
      number: product.id,
      price: product.price,
      status: "pending",
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/order`, order)
      .then((res) => {
        message.success("Order Created!");
        this.setState({ receipt: res.data });
      })
      .catch((err) => {
        console.log("Products API Error: ", err);
      });

    this.setState({ cartButtonValidation: true });

    //Redirect to Home after 5 Seconds
    setTimeout(() => {
      this.props.history.push("/");
    }, 5000);
  };
  render() {
    const { quantity, cartButtonValidation } = this.state;
    const { product } = this.props;
    return (
      <div className="overview-content">
        <List>
          {cartButtonValidation ? (
            <Receipt receipt={this.state.receipt} />
          ) : (
            <div>
              <List.Item style={{ borderBottom: 0 }}>
                <div className="content-title">
                  {product.name}
                  <div className="content-price">PKR {product.price}</div>
                </div>
              </List.Item>
              <Divider />
              <List.Item style={{ borderBottom: 0 }}>
                <div className="content-quantity-title">
                  <strong>Ingredients : </strong>
                  {product.ingredients}
                </div>
              </List.Item>
              <List.Item style={{ borderBottom: 0 }}>
                <div className="content-quantity-title">
                  <strong>Meal : </strong>
                  {product.mealType}
                </div>
              </List.Item>
              <List.Item style={{ borderBottom: 0 }}>
                Nutrition Fact: <div className="content-quantity-title"></div>
              </List.Item>
              <Row justify="space-between">
                <Col span={12}>
                  <List.Item>
                    <div className="content-quantity-title"> Quantity: </div>
                  </List.Item>
                </Col>
                <Col span={12}>
                  <div className="site-input-number-wrapper">
                    <Input.Group size="large">
                      <Row gutter={4}>
                        <Col span={4}>
                          <Button size="large" onClick={this.onQuantityMinus}>
                            <i className="content-ic fas fa-minus"></i>
                          </Button>
                        </Col>
                        <Col span={5}>
                          <Input
                            value={quantity}
                            style={{ textAlign: "center", marginLeft: 1 }}
                          />
                        </Col>
                        <Col span={4}>
                          <Button size="large" onClick={this.onQuantityAdd}>
                            <i className="content-ic fas fa-plus"></i>
                          </Button>
                        </Col>
                      </Row>
                    </Input.Group>
                  </div>
                </Col>
              </Row>
            </div>
          )}

          <List.Item>
            {cartButtonValidation ? (
              <Button
                size="large"
                type="success"
                className="add-cart-btn"
                style={{ backgroundColor: "#32cd32" }}
              >
                <i
                  className="content-cart-button far fa-check-circle"
                  style={{ color: "#FFF", paddingRight: 8 }}
                ></i>
                <span>Order Placed</span>
              </Button>
            ) : (
              <Button
                size="large"
                type="primary"
                className="add-cart-btn"
                onClick={() => {
                  this.setAddToCart();
                }}
              >
                <i className="fas fa-cart-plus" style={{ paddingRight: 8 }}></i>
                <span>Buy Now</span>
              </Button>
            )}
          </List.Item>
        </List>
      </div>
    );
  }
}

export default withRouter(ProductOverview);
