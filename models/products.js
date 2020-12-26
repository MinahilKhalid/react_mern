const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

var productSchema= mongoose.Schema({
    name: String,
    price: Number,
    mealType: [String],
    ingredients: String,
    nutritionFacts: 
        {   
            carbohydrate: Number,
            calories: Number,
            sugar: Number,
            fiber: Number,
            protein: Number,
            sodium: Number,
        },
    img: String
});

var Product = mongoose.model('Product', productSchema);


  

function validateProduct(data){
    const schema= Joi.object({
        name:Joi.string().min(3).required(),
        price:Joi.number().min(0).required(),
        mealType:Joi.array().items(Joi.string()).required(),
        ingredients: Joi.string().required(),
     })
    return schema.validate(data, {abortEarly:false});
}

module.exports.Product= Product;
module.exports.validateProduct= validateProduct;
