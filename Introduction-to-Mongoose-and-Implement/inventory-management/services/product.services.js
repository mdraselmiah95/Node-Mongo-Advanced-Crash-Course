const Product = require("../models/Product");

exports.getProductService = async (limit) => {
  const product = await Product.find({}).limit(10);
  return product;
};

exports.createProductService = async (data) => {
  if (data.quantity === 0) {
    data.status = "out-of-stock";
  }
  const product = await Product.create(data);
  return product;
};
