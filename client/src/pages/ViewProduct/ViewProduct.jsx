import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Tabs, List, Empty, Layout } from "antd";
import Magnifier from "react-magnifier";
import ProductOverview from "./ProductOverview/ProductOverview";

const { TabPane } = Tabs;
const { Content } = Layout;

class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
    };
  }
  componentDidMount() {
    axios
      .get(`https://heruko-react.herokuapp.com/products`)
      .then((res) => {
        if (res.data && res.data.length) {
          res.data.forEach((product) => {
            if (product.id === this.props.match.params.id) {
              this.setState({ selectedProduct: product });
            }
          });
        }
      })
      .catch((err) => {
        console.log("Products API Error: ", err);
      });
  }

  render() {
    const { selectedProduct } = this.state;
    return (
      <>
        {selectedProduct ? (
          <Layout>
            <Content
              className="site-layout"
              style={{ padding: "0 40px", marginTop: 70 }}
            >
              <Layout
                className="site-layout-background"
                style={{ padding: "20px 0px", minHeight: 380 }}
              >
                <Row>
                  <Col
                    key="Image"
                    xxl={6}
                    xl={6}
                    lg={6}
                    md={14}
                    sm={16}
                    xs={15}
                  >
                    <div className="product-list" style={{ marginTop: "5px" }}>
                      <div className="img-magnifier">
                        <Magnifier
                          src={selectedProduct.img}
                          width={"100%"}
                          mgWidth={220}
                          mgHeight={220}
                          mgShape={"square"}
                          zoomFactor={1.1}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col
                    key="content"
                    xxl={10}
                    xl={14}
                    lg={14}
                    md={24}
                    sm={24}
                    xs={24}
                  >
                    <ProductOverview product={selectedProduct} />
                  </Col>
                </Row>
              </Layout>
            </Content>
          </Layout>
        ) : (
          <Empty />
        )}
      </>
    );
  }
}

export default ViewProduct;
