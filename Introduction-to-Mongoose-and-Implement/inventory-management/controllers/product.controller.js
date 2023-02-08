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
    // { price: { $gt:50 }} [gt]=50

    let filters = { ...req.query };

    // sort, page, limit => exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    // TODO: gt, lt, gte, lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filtersString);

    const queries = {};
    if (req.query.sort) {
      // price,quantity => "price quantity"
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }
    // this the code the code vim the well
    if (req.query.page) {
      /**
       * 50 Products
       * each page 10 product
       * page 1--> 1-10
       * page 2--> 2-20
       * page 3--> 21-30     --> page 3  -> skip 1-20  -> 3-1 ->2 *10
       * page 4--> 31-40      ---> page 4 --> 1-30  --> 4-1  -->3*10
       * page 5--> 41-50
       */
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const products = await getProductService(filters, queries);

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
