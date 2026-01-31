const express = require('express');
const { protect, verifyRole } = require("../middlewares/authMiddleware");
const productController = require('../controllers/productController');

const router = express.Router();

router.use(protect);

router.route("/")
  .get(productController.getAllProducts)
  .post(verifyRole, productController.createProduct);

router.route("/:id")
  .get(productController.getProductById)
  .put(verifyRole, productController.updateProduct)
  .delete(verifyRole, productController.deleteProduct);

module.exports = router;