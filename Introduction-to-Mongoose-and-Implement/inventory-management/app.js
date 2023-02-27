const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Middleware
app.use(express.json());
app.use(cors());

// Route
const productRoute = require("./routes/product.route");
const brandRoute = require("./routes/brand.route");
const categoryRoute = require("./routes/category.route");
const storeRoute = require("./routes/store.route");
const supplierRoute = require("./routes/supplier.route");
const stockRoute = require("./routes/stock.route");

//TODO: SCHEMA => MODEL => QUERY

app.get("/", (req, res) => {
  res.send("Route Is Working 🥈");
});

// Posting To Database

app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/stock", stockRoute);

module.exports = app;

// video=>10.03=>22.57 the are
