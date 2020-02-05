var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var categoriesRouter = require("./routes/categories");
var productsRouter = require("./routes/products");
var cartsRouter = require("./routes/carts");
var cartItemsRouter = require("./routes/cartItems");
var ordersRouter = require("./routes/orders");

const fileUpload = require("express-fileupload");

var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/shoppingDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected!");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/cartitems", cartItemsRouter);
app.use("/api/orders", ordersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
