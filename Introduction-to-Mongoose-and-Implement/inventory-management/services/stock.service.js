const Stock = require("../models/Stock");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getStockService = async (filters, queries) => {
  const stocks = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const total = await Stock.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, page, stocks };
};

exports.getStockByIdService = async (id) => {
  // const stock = await Stock.findOne({ _id: id })
  //   .populate("store.id")
  //   .populate("suppliedBy.id")
  //   .populate("brand.id");

  //TODO: Aggression pipe line=> many stages
  // TODO: Data=> one stage => two stage
  // TODO: name,age contactNo => contactNo

  const stock = await Stock.aggregate([
    //stage1
    { $match: { _id: ObjectId(id) } },
  ]);

  return stock;
};

exports.createStockService = async (data) => {
  if (data.quantity === 0) {
    data.status = "out-of-stock";
  }
  const stock = await Stock.create(data);
  return stock;
};

// exports.updateProductService = async (productId, data) => {
//   const result = await Product.updateOne(
//     { _id: productId },
//     { $inc: data },
//     { runValidators: true }
//   );

//   return result;
// };

// exports.deleteStockByIdService = async (id) => {
//   const result = await Product.deleteOne({ _id: id });
//   return result;
// };
