import React, { Component } from "react";
import { Row, Col, Table, Popconfirm, Empty, message } from "antd";
import { withRouter } from "react-router-dom";
import axios from "axios";
// import { UserContext } from "../../../context/UserContext";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      deletedIndex: null,
      deleted: false,
      orders: null,
      columns: [
        {
          title: "Id",
          dataIndex: "key",
          width: "5%",
        },
        {
          title: "OrderID",
          dataIndex: "orderid",
          width: "10%",
        },
        {
          title: "Price",
          dataIndex: "price",
        },
        {
          title: "Date",
          dataIndex: "date",
        },
        {
          title: "Status",
          dataIndex: "status",
        },
        {
          title: "x",
          dataIndex: "delete",
        },
      ],
    };
  }
  // static contextType = UserContext;

  componentDidMount() {
    this.apiCall();
  }

  apiCall = () => {
    const { setProducts } = this.context;
    return axios
      .get(`https://heruko-react.herokuapp.com/order`)
      .then((res) => {
        this.setState({ orders: res.data });
      })
      .catch((err) => {
        console.log("Products API Error: ", err);
      });
  };
  // shouldComponentUpdate(prevProps, props) {

  // }

  handleDelete = (index, id) => {
    this.setState({ deletedIndex: index });
    // axios
    //   .delete(`${process.env.REACT_APP_API_URL}/products/${id}`)
    //   .then((res) => {
    //     this.setState({ deleted: true });
    //     message.success('Product Deleted!');
    //   })
    //   .catch((err) => {
    //     console.log("Products API Error: ", err);
    //   });
  };

  render() {
    const { columns, deletedIndex, orders } = this.state;

    // const rowData = {products && products.length ? ;

    return (
      <>
        {orders && orders.length ? (
          <Row gutter={32}>
            <Col span={24}>
              <div className="container-custom left-container">
                <Table
                  bordered
                  dataSource={orders
                    .map((row, index) => {
                      const rowData = {
                        key: index + 1,
                        orderid: row.id,
                        price: row.price,
                        date: row.date,
                        status: row.status,
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

export default withRouter(Orders);
