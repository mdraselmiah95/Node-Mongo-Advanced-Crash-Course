const {
  createBrandService,
  getBrandService,
  getBrandByIdService,
  updateBrandByIdService,
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

exports.getBrandById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const brand = await getBrandByIdService(id);

    if (!brand) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't Find Brand with This ID",
      });
    }

    res.status(200).json({
      status: "Success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: "Couldn't create the brand",
    });
  }
};

exports.updateBrandById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateBrandByIdService(id, req.body);

    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't update the Brand with This ID",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully update the Brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: "Couldn't create the brand",
    });
  }
};
