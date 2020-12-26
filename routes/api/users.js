const express = require("express");
let router = express.Router();
var { User } = require("../../models/user");

router.get("/", async (req, res) => {
  let user = await User.findOne({ _id: req.user._id })
  return res.send({ _id: user._id, name: user.name, email: user.email, user_type: user.user_type });
});

module.exports = router;
