import React, { Component } from "react";
import { Modal, Input, InputNumber, message } from "antd";
import axios from "axios";
import { Form, Select, Button } from "antd";

const { Option } = Select;

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const onFinish = (values) => {
      const body = {
        name: values.name,
        price: values.product.price,
        mealType: values.mealtype,
        ingredients: values.ingredients,
      };
      axios
        .post(`https://heruko-react.herokuapp.com/products`, body)
        .then((res) => {
          message.success("Product Added!");
        })
        .catch((err) => {
          console.log("Products API Error: ", err);
        });
    };
    return (
      <>
        <Modal
          title="Add Product"
          centered
          visible={this.props.modalVisible}
          onOk={() => this.props.setModalVisible(false)}
          onCancel={() => this.props.setModalVisible(false)}
        >
          <Form id="myForm" name="validate_other" onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter product name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["product", "price"]}
              label="Price"
              rules={[
                {
                  required: true,
                  type: "number",
                  min: 0,
                  max: 500000,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="mealtype"
              label="Meal Type"
              rules={[
                {
                  required: true,
                  message: "Please select meal type!",
                  type: "array",
                },
              ]}
            >
              <Select mode="multiple" placeholder="Please select meal type">
                <Option value="Breakfast">Breakfast</Option>
                <Option value="Lunch">Lunch</Option>
                <Option value="Vegan">Vegan</Option>
                <Option value="Vegetarian">Vegetarian</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Ingredients"
              name="ingredients"
              rules={[
                {
                  required: true,
                  message: "Please enter Ingredients!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Image Link"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please enter Image Link!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
          <Button
            form="myForm"
            onClick={() => this.props.setModalVisible(false)}
            style={{ float: "right", margin: "35px 5px" }}
            type="primary"
            key="submit"
            htmlType="submit"
          >
            Add Product
          </Button>
        </Modal>
      </>
    );
  }
}

export default AddProduct;
