const {
  getProductService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductByIdService,
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

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = await req.params;
    const result = await updateProductService(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully Updated the Product 🥈",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't not update the product.",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully Updated the Product 🥈",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't not update the product.",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);

    res.status(200).json({
      status: "success",
      message: "Successfully Deleted the Product 🥈",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't not Deleted the product.",
      error: error.message,
    });
  }
};

// Testing the code the code
