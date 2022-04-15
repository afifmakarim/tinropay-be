var express = require("express");
var router = express.Router();
const {
  createProduct,
  getAllProducts,
  createDenom,
  getDenomById,
  getProductDetail,
  getProductsByCategory,
  getProductBySlugName,
} = require("../controllers/apiControllers");
const {
  LinkAjaPay,
  getTransactionByTrxId,
  updateTransaction,
} = require("../controllers/paymentControllers");

router.post("/products", createProduct);
router.post("/denom", createDenom);
router.get("/products", getAllProducts);
router.get("/denom/:productId", getDenomById);
router.get("/products/:id", getProductDetail);
router.get("/products/:id/category", getProductsByCategory);
router.get("/products/:id/slug", getProductBySlugName);

// Payment
router.post("/linkaja", LinkAjaPay);
router.get("/transaction/:id", getTransactionByTrxId);
router.put("/transaction/:id", updateTransaction);
module.exports = router;
