const express = require("express");
const {
    getAllProducts,
    createPorduct,
    updateProduct,
    productDelete,
    showProductDetails,
    createProductReview,
} = require("../controllers/productController");
const {isAuthenticateUser, authorizeRoles} = require("../middleware/Auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(isAuthenticateUser,authorizeRoles("admin"),createPorduct);
router
    .route("/products/:id")
    .put(isAuthenticateUser,updateProduct)
    .delete(isAuthenticateUser,productDelete)
    .get(showProductDetails);

router.route("/review").put(isAuthenticateUser,createProductReview)

module.exports = router;
