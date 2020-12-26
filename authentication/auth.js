const express = require('express');
const router = express.Router();;
var { User } = require("../models/user");
// const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config')

router.route('/')
  .post(async (req, res) => {
    const { error } = validate(req.body);
    if (error) { return res.status(400).send(error.details[0].message) }


    console.log(req.body.password)
    let user = await User.findOne({ email: req.body.email })
    if (!user) { return res.status(400).send('Invalid username or password!') }
    if (req.body.password != user.password) { return res.status(400).send('Invalid username or password!') }

    const token = jwt.sign({ _id: user._id },
      config.get('jwtPrivateKey'), { expiresIn: '24h' })
    res.status(200).send({
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        user_type: user.user_type
      }
    })

  })

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(100).required().email(),
    password: Joi.string().min(5).max(100).required()
  })
  return schema.validate(req, { abortEarly: false })
}
module.exports = router;