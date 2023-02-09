const {
  createBrandService,
  getBrandService,
} = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully Create the Brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: "Couldn't create the brand",
    });
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandService(req.body);
    res.status(200).json({
      status: "Success",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: "Couldn't create the brand",
    });
  }
};
