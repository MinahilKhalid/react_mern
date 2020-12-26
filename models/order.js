const mongoose = require('mongoose');

var orderSchema= mongoose.Schema({
    number: String,
    price: Number,
    date: Date,
    status: String,
});

var Order = mongoose.model('Order', orderSchema);


module.exports.Order= Order;