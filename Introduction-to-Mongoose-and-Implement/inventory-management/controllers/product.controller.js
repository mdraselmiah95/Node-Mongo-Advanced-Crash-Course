const {
  getProductService,
  createProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    // const product = await Product.where("name")
    //   .equals("Battery")
    //   .where("quantity")
    //   .gte(10)
    //   .lt(600)
    //   .limit(2)
    //   .sort({ quantity: -1 });
    const products = await getProductService(req.query.limit);

    res.status(200).json({
      status: "successful",
      data: products,
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
    const result = await createProductService(req.body);
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
