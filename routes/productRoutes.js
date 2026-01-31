const express = require('express');
const { protect, verifyRole } = require("../middlewares/authMiddleware");
const productController = require('../controllers/productController');

const router = express.Router();

router.use(protect);

router.route("/")
  .get(productController.getAllProducts)
  .post(verifyRole, productController.createProduct)
  .put(verifyRole, productController.updateProduct)
  .delete(verifyRole, productController.deleteProduct);

router.get("/:id", productController.getProductById);

module.exports = router;