const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Middleware
app.use(express.json());
app.use(cors());

// Route
const productRoute = require("./routes/product.route");

//TODO: SCHEMA => MODEL => QUERY

app.get("/", (req, res) => {
  res.send("Route Is Working 🥈");
});

// Posting To Database

app.use("/api/v1/product", productRoute);

module.exports = app;

// Testing the code the code
