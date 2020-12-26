const express = require("express");
let router = express.Router();
const validateProductContainer = require("../../middleware/validateProduct");
var { Product } = require("../../models/products");

router.get("/", async (req, res) => {
  var response = [];  
  // let page = Number(req.query.page ? req.query.page : 1);
  // let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  // let skipRecords = perPage * (page - 1);
  // let products = await Product.find().skip(skipRecords).limit(perPage);
  let products = await Product.find();

  products.forEach((product) => {
    response.push({
      id: product._id,
      name: product.name,
      price: product.price,
      mealType: product.mealType,
      ingredients: product.ingredients,
      nutritionFacts: product.nutritionFacts,
      img: product.img
    });
  });
  
  return res.send(response);
});

//get one product
router.get("/:id", async (req, res, next)=>{
  try {
      let product = await Product.findById(req.params.id); 
      if(!product) return res.status(400).send("Product with given ID is not present");
      return res.send(product);
  } catch (err) {
      return res.status(400).send("Invalid ID");
  }
});

//update
router.put("/:id", validateProductContainer, async(req,res) => {
  let product=await Product.findById(req.params.id);
  if(!product) return res.status(400).send("Product with given ID is not present");
  product.name=req.body.name;
  product.price=req.body.price;
  product.mealType= req.body.mealType;
  product.ingredients=req.body.ingredients;
  product.nutritionFacts=req.body.nutritionFacts;

  await product.save();
  return res.send(product);
});

//delete
router.delete("/:id", async(req,res) => {
  let product=await Product.findByIdAndDelete(req.params.id);
  if(!product) return res.status(400).send("Product with given ID is not present");

  return res.send(product);
});

//insert a record
router.post("/",validateProductContainer, async(req,res) => {
  let product= new Product();
  product.name=req.body.name;
  product.price=req.body.price;
  product.mealType= req.body.mealType;
  product.ingredients=req.body.ingredients;
  product.nutritionFacts=req.body.nutritionFacts;
  product.img= req.body.img;
  
  await product.save();
  return res.send(product);
});


module.exports = router;
