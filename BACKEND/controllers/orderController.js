const catchasyncErrors = require("../middleware/catchasyncErrors");
const ErrorHandler = require("../UTILS/errorHandler");
const Order = require("../models/orderModels");
const Product = require("../models/productModels");
const products = require("../models/productModels");

exports.newOrder = catchasyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        paidAt,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        orderStatus,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        paidAt,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        orderStatus,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        order
    })
});

//GetSingleOrder
exports.getSingleOrder = catchasyncErrors(async (req, res, next) => {
    const singleOrder = await Order.findById(req.params.id)
    if (!singleOrder) {
        return next(new ErrorHandler("order not found this id", 404)).populate("user", "name email")
    }

    res.status(200).json({
        success: true,
        singleOrder
    })
})

//getAll orders of logged in user
exports.myOrder = catchasyncErrors(async (req, res, next) => {
    // console.log(req.user._id);
    const myOrders = await Order.find({ user: req.user._id });
    res.status(200).json({
        success: true,
        myOrders
    })
})

//GET ALL ORDERS----ADMIN
exports.getAllOrders = catchasyncErrors(async (req, res, next) => {
    // console.log(req.user._id);
    const allOrders = await Order.find();

    let totalAmount = 0;
    allOrders.forEach((order) => {
        totalAmount += order.totalPrice
    })



    res.status(200).json({
        success: true,
        allOrders,
        totalAmount
    })
})

//Update order Status

// exports.updateOrder = catchasyncErrors(async (req, res, next) => {
//     // console.log(req.user._id);
//     const updatedOrder = await Order.findById);




//     res.status(200).json({
//         success: true,
//         allOrders,
//         totalAmount
//     })
// })
//update a order with details

exports.deleteOrder = catchasyncErrors(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) {
        return next(new ErrorHandler("this is not correct id to update order"))
    }
    res.status(200).json({
        success: true
    })
})

/*{
       "shippingInfo":{
           "address":"2h8 mn3",
           "city":"kota",
           "state":"rajasthan",
           "country":"india",
           "pinCode":324005
       },
        "orderItems":[{
            "name":"mayoneese",
            "price":"300",
            "quantity":"2",
            "image":"https"
        }],
        "paymentInfo":{
            "id":"paymentid2134",
            "status":"completed"
        },
        "paidAt":"",
        "itemPrice":300,
        "taxPrice":50,
        "shippingPrice":40,
        "totalPrice":390,
        "orderStatus":"pending",
        "deliveredAt":"2022-06-30"
} */

