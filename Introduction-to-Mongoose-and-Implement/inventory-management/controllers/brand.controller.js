exports.createBrand = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: "Couldn't create the brand",
    });
  }
};
