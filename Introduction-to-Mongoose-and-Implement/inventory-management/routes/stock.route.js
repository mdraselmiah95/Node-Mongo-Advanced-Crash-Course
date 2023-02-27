const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stock.controller");

// router.route("/bulk-update").patch(stockController.bulkUpdateStock);
// router.route("/bulk-delete").delete(stockController.bulkDeleteStock);

router
  .route("/")
  .get(productController.getStocks)
  .post(productController.createStock);

router
  .route("/:id")
  .patch(productController.updateStockById)
  .delete(productController.deleteStockById);

module.exports = router;
