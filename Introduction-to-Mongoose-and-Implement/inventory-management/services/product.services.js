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

exports.updateProductService = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $inc: data },
    { runValidators: true }
  );

  // const product = await Product.findById(productId);
  // const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  console.log(data.data, data.ids);
  const result = await Product.updateMany({ _id: data.ids }, data.data, {
    runValidators: true,
  });
  return result;
};
