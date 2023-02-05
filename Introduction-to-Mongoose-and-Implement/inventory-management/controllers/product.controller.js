const Product = require("../models/Product");

exports.getProducts = async (req, res, next) => {
  try {
    // const product = await Product.where("name")
    //   .equals("Battery")
    //   .where("quantity")
    //   .gte(10)
    //   .lt(600)
    //   .limit(2)
    //   .sort({ quantity: -1 });

    const product = await Product.find({});

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
};

exports.createProduct = async (req, res, next) => {
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
};
