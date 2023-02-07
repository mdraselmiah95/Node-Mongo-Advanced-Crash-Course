const {
  getProductService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    const filters = { ...req.query };

    // sort, page, limit => exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    const products = await getProductService(filters);

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

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Could't delete the product",
      });
    }
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

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);

    res.status(200).json({
      status: "success",
      message: "Successfully Deleted the Given Products 🥈",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't Not Deleted the Given products.",
      error: error.message,
    });
  }
};
