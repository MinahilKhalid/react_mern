import React, { Component } from "react";
import { Descriptions, Empty } from "antd";
class Receipt extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { receipt } = this.props;
    return (
      <div>
        {receipt ? (
          <Descriptions
            title="Order Receipt"
            bordered
          >
            <Descriptions.Item label="OrderId: ">
              {receipt._id}
            </Descriptions.Item>
            <Descriptions.Item label="Price: ">
              {receipt.price}
            </Descriptions.Item>
            <Descriptions.Item label="Status: ">
              {receipt.status}
            </Descriptions.Item>
            <Descriptions.Item label="Date: ">{receipt.date}</Descriptions.Item>
          </Descriptions>
        ) : (
          <Empty />
        )}
      </div>
    );
  }
}

export default Receipt;
