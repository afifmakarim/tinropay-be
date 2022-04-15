var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var apiRouter = require("./routes/api");
var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tinropay/v1", apiRouter);

// const productList = require("./models/ProductList.model");
// const denomList = require("./models/DenomList.model");
// const payment = require("./models/Payment.model");
// payment.sync({ force: true });
// console.log("The table for the User model was just (re)created!");
module.exports = app;
