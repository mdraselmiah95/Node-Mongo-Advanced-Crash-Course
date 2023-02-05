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
      required: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity cant be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be an integer",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now
    // }
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier"
    // },
    // categories: [{
    //   name: {
    //     type: String,
    //     required: true
    //   },
    //   _id: mongoose.Schema.Types.ObjectId
    // }]
  },
  {
    timestamps: true,
  }
);

// mongoose middleware for saving data: pre/post

productSchema.pre("save", function (next) {
  console.log("Before Saving Data");
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  next();
});

// productSchema.post("save", function (doc, next) {
//   console.log("After Saving Data");

//   next();
// });

productSchema.methods.logger = function () {
  console.log(`Data Save For ${this.name}`);
};

//TODO: SCHEMA => MODEL => QUERY

const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("Route Is Working 🥈");
});

// Posting To Database

app.post("/api/v1/product/", async (req, res, next) => {
  try {
    const result = await Product.create(req.body);
    result.logger();
    // const product = new Product(req.body);
    // const result = await product.save();

    res.status(200).json({
      status: "success",
      message: "Data Inserted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not inserted",
      error: error.message,
    });
  }
});

app.get("/api/v1/product", async (req, res, next) => {
  try {
    const product = await Product.where("name")
      .equals(/|w/)
      .where("quantity")
      .gt(100)
      .lt(600)
      .limit(2);
    res.status(200).json({
      status: "successful",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Can't get the Data",
      error: error.message,
    });
  }
});

module.exports = app;
