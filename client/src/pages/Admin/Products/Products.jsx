import React, { Component } from "react";
import { Row, Col, Table, Popconfirm, Empty, message } from "antd";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      deletedIndex: null,
      deleted: false,
      columns: [
        {
          title: "Id",
          dataIndex: "key",
          width: "5%",
        },
        {
          title: "Product",
          dataIndex: "product",
          width: "10%",
        },
        {
          title: "Description",
          dataIndex: "description",
        },
        {
          title: "Price",
          dataIndex: "price",
        },
        {
          title: "x",
          dataIndex: "delete",
        },
      ],
    };
  }
  static contextType = UserContext;

  componentDidMount() {
    this.apiCall();
  }

  apiCall = () => {
    const { setProducts } = this.context;
    return axios
      .get(`${process.env.REACT_APP_API_URL}/products`)
      .then((res) => {
        setProducts(res.data);
        // this.setState({ products: res.data });
      })
      .catch((err) => {
        console.log("Products API Error: ", err);
      });
  };
  // shouldComponentUpdate(prevProps, props) {

  // }

  handleDelete = (index, id) => {
    this.setState({ deletedIndex: index });
    axios
      .delete(`${process.env.REACT_APP_API_URL}/products/${id}`)
      .then((res) => {
        this.setState({ deleted: true });
        message.success("Product Deleted!");
      })
      .catch((err) => {
        console.log("Products API Error: ", err);
      });
  };

  render() {
    const { columns, deletedIndex, deleted } = this.state;
    const { products } = this.context;

    return (
      <>
        {products && products.length ? (
          <Row gutter={32}>
            <Col span={24}>
              <div className="container-custom left-container">
                <Table
                  bordered
                  dataSource={products
                    .map((row, index) => {
                      const rowData = {
                        key: index + 1,
                        product: <img src={row.img} alt={row.img} width={70} />,
                        description: row.ingredients,
                        price: row.price,
                        delete: (
                          <Popconfirm
                            title="Sure to delete?"
                            onConfirm={() =>
                              this.handleDelete(index + 1, row.id)
                            }
                          >
                            <a>
                              <i className="far fa-trash-alt"></i>
                            </a>
                          </Popconfirm>
                        ),
                      };
                      return rowData;
                    })
                    .filter((row) => {
                      return row.key !== deletedIndex;
                    })}
                  columns={columns}
                />
              </div>
            </Col>
          </Row>
        ) : (
          <Empty />
        )}
      </>
    );
  }
}

export default withRouter(Products);
