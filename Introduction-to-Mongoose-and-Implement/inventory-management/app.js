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

//TODO: SCHEMA => MODEL => QUERY

app.get("/", (req, res) => {
  res.send("Route Is Working 🥈");
});

// Posting To Database

app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);

module.exports = app;

// video=>05
