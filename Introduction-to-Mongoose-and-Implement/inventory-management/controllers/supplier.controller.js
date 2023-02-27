const {
  createSupplierService,
  getSupplierService,
  getSupplierByIdService,
  updateSupplierByIdService,
} = require("../services/supplier.service");

exports.createSupplier = async (req, res) => {
  try {
    const result = await createSupplierService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Successfully Create the Supplier",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: "Couldn't create the Supplier",
    });
  }
};

exports.getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await getSupplierService(req.body);
    res.status(200).json({
      status: "Success",
      data: suppliers,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: "Couldn't create the Supplier",
    });
  }
};

exports.getSupplierById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const supplier = await getSupplierByIdService(id);

    if (!supplier) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't Find Supplier with This ID",
      });
    }

    res.status(200).json({
      status: "Success",
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: "Couldn't create the Supplier",
    });
  }
};

exports.updateSupplier = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateSupplierByIdService(id, req.body);

    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't update the Supplier with This ID",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Successfully update the Supplier",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: "Couldn't create the Supplier",
    });
  }
};
