const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

var userSchema= mongoose.Schema({
    name: String,
    email: String,
    password: String,
    user_type: String,
    city: String
});

var User = mongoose.model('User', userSchema);

function validateUser(data){
    const schema= Joi.object({
        name:Joi.string().min(3).required(),
        email:Joi.string().email().min(3).required(),
        password:Joi.string().password().min(3).required(),
        user_type:Joi.string().min(3).required(),
        city:Joi.string().min(3).required()
    })
    return schema.validate(data, {abortEarly:false});
}

module.exports.User= User;
module.exports.validateUser= validateUser;
