const Brand = require("../models/Brand");
const Product = require("../models/Product");

exports.getProductService = async (filters, queries) => {
  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const total = await Product.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, page, products };
};

exports.createProductService = async (data) => {
  if (data.quantity === 0) {
    data.status = "out-of-stock";
  }
  const product = await Product.create(data);
  const { _id: productId, brand } = product;
  const result = await Brand.updateOne(
    { _id: brand.id },
    { $push: { products: productId } }
  );
  console.log(result);
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
  // const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });

  const products = [];
  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });
  const result = await Promise.all(products);
  console.log(result);
  return result;
};

exports.deleteProductByIdService = async (id) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

exports.bulkDeleteProductService = async (ids) => {
  const result = await Product.deleteMany({});
  return result;
};
