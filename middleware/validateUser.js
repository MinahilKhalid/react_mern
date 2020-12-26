const { validateUser }= require("../models/user");

function validateUserContainer(req, res, next){
    let {error} = validateUser(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);
    next(); 
}

module.exports=validateUserContainer;