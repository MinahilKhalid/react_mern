const express = require("express");
const app = express();
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const login = require("./authentication/auth");
const products = require("./routes/api/product");
const order = require("./routes/api/order");
const users = require("./routes/api/users");
const verifyJWT = require("./middleware/verifyJWT");

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivatekey is not defined");
  process.exit(1);
}

const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: true }));

app.listen(port, () => {
  console.log("Listening at port `${port}`");
});

//ROUTES ---------------------------------------------------->
// app.use("/api/users", usersRouter);
app.use("/api/products", products);
app.use("/api/order", order);
app.use("/api/login", login);

app.use("/api/user", verifyJWT, users);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

mongoose
  .connect(process.env.myBagelShop_db || config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));

module.exports = app;
