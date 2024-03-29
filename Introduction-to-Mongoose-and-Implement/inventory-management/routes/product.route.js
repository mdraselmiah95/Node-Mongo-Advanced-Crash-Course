const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const uploader = require("../middleware/uploader");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");

// router.use(verifyToken); all the low level router are authenticate
router.post(
  "/file-upload",
  uploader.array("image"),
  productController.fileUpload
);

{
  /* <input type="file" name="image" /> */
}
// const formData = new FormData();
// formData.append("image", forData);

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router
  .route("/")
  .get(productController.getProducts)
  .post(
    verifyToken,
    authorization("admin", "store-manager"),
    productController.createProduct
  );

router
  .route("/:id")
  .patch(productController.updateProductById)
  .delete(authorization("admin"), productController.deleteProductById);

module.exports = router;

// false is good but not everytime
