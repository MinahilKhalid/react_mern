import React, { Component } from "react";
import { Row, Col, Empty } from "antd";
import axios from "axios";
import Card from "../../components/Card";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://heruko-react.herokuapp.com/api/products")
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((err) => {
        console.log("Products API Error: ", err);
      });
  }

  render() {
    const { products } = this.state;
    const handleCardClick = (id) => {
      this.props.history.push(`/product/${id}`);
    };
    return (
      <>
        <h2 style={{ marginBottom: "50px" }}>
          Pick your favourite meal and click to place the order:<br></br>
        </h2>

        {products && products.length ? (
          <div className="site-card-wrapper">
            <Row gutter={[16, 24]}>
              {products.length > 0 ? (
                products.map((product) => {
                  return (
                    <Col span={6} key={product.id}>
                      <Card
                        handleCardClick={handleCardClick}
                        product={product}
                      />
                    </Col>
                  );
                })
              ) : (
                <></>
              )}
            </Row>
          </div>
        ) : (
          <Empty />
        )}
      </>
    );
  }
}

export default Home;
