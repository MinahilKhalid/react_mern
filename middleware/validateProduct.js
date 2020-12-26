const { validateProduct } = require("../models/products");

function validateProductContainer(req, res, next) {
  let { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}

module.exports=validateProductContainer;
