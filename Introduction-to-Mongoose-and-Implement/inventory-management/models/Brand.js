const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Please Provide a Brand Name"],
      maxLength: 100,
      lowercase: true,
    },
    description: String,
    email: {
      type: String,
      lowercase: true,
      validator: [validator.isEmail, "Please Provide a Valid Email"],
    },
    website: {
      type: String,
      validator: [validator.isURL, "Please Provide a Valid URL"],
    },
    location: String,
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    supplier: [
      {
        name: String,
        contactNumber: String,
        id: {
          type: ObjectId,
          ref: "Supplier",
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
