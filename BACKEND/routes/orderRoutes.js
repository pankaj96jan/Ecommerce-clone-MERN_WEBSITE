const express = require("express");
const { newOrder, getSingleOrder, myOrder, getAllOrders, deleteOrder } = require("../controllers/orderController");
const {isAuthenticateUser, authorizeRoles} = require("../middleware/Auth");

const router = express.Router()

router.route("/order/new").post(isAuthenticateUser,newOrder)
router.route("/order/:id").get(isAuthenticateUser,getSingleOrder)
router.route("/orders/me").get(isAuthenticateUser,myOrder)
router.route("/orders/all").get(isAuthenticateUser,getAllOrders)
router.route("/orders/:id").delete(isAuthenticateUser,deleteOrder)



module.exports = router