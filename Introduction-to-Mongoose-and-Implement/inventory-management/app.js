const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Middleware
app.use(express.json());
app.use(cors());

// Schema Design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide a Name for this Product"],
      trim: true,
      unique: [true, "Name must be Unique"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too Large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be Negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "liter", "pcs"],
        message: "Unit value can't be {VALUE}, must be kg/liter/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be Negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
        message: "Quantity must be an Integer.",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
    //   updatedAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
  },
  { timestamps: true }
);

app.get("/", (req, res) => {
  res.send("Route Is Working 🥈");
});

module.exports = app;
