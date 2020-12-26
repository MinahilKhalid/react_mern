const express = require("express");
let router = express.Router();
const validateProductContainer = require("../../middleware/validateProduct");
var { Order } = require("../../models/order");

router.get("/", async (req, res) => {
  var response = [];
  let orders = await Order.find();

  orders.forEach((order) => {
    response.push({
      id: order._id,
      price: order.price,
      date: order.date,
      status: order.status,
    });
  });
  
  return res.send(response);
});


//insert a record
router.post("/", async(req,res) => {
  let order= new Order();
  order.number = req.body.number;
  order.price =req.body.price;
  order.date= req.body.date;
  order.status=req.body.status;
  
  await order.save();
  return res.send(order);
});


module.exports = router;
