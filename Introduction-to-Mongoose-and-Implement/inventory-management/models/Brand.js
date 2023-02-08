const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Please Provide a Brand Name"],
    maxLength: 100,
  },
});
