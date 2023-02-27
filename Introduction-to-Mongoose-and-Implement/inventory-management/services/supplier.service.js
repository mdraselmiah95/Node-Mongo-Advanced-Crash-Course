const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
  const result = await Supplier.create(data);
  return result;
};

exports.getSupplierService = async () => {
  const suppliers = await Supplier.find({});
  return suppliers;
};

exports.getSupplierByIdService = async (id) => {
  const suppliers = await Supplier.findOne({ _id: id });
  return suppliers;
};

exports.updateSupplierByIdService = async (id, data) => {
  const result = await Supplier.updateOne({ _id: id }, data, {
    runValidators: true,
  });
  return result;
};
