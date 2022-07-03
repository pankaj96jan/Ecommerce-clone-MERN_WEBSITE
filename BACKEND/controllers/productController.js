const catchasyncErrors = require("../middleware/catchasyncErrors");
const ErrorHandler = require("../UTILS/errorHandler");
const products = require("../models/productModels");
const Apifeatures = require("../UTILS/apifeatures");
const user = require("../models/userModel");

//create Product
exports.createPorduct = catchasyncErrors(async (req, res, next) => {
    req.body.user = req.user.id
    const product = await products.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
    next();
})

//GET ALL PRODUCTS
exports.getAllProducts = catchasyncErrors(async (req, res) => {
    console.log(req.user);
    const resultPerPage = 8
    const productCount = await products.countDocuments()

    // if (!req.user) {
    const apiFeature = new Apifeatures(products.find(),
        req.query).search().filter().pagination(resultPerPage)

    const Product = await apiFeature.query
    res.status(200).json({
        success: true,
        Product,
        productCount
    })
    // }
    // .then((products) => {
    //     res.json(products);
    // })
    // .catch((err) => {
    //     res.json(err.message);
    // });
})

//Update product --Admin

exports.updateProduct = catchasyncErrors(async (req, res) => {
    let product = await products.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found",
        });
    }

    product = await products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        product,
    });
})

exports.productDelete = catchasyncErrors(async (req, res, next) => {
    const product = await products.findById(req.params.id)

    if (!product) {
        return res.status(500).json({
            succes: false
        })
    }
    await product.remove()

    res.status(200).json({
        succes: true,
        message: "Product delted successfully"
    })
    next()
})

exports.showProductDetails = catchasyncErrors(async (req, res, next) => {
    let product = await products.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("product not found", 404))

        // res.status(500).json({
        //     success: false,
        //     message: "Product not found",
        // });
    }
    res.status(200).json({
        succes: true,
        product
    })
})

//Create New Review or Update the Review
exports.createProductReview = catchasyncErrors(async (req, res, next) => {

    const { ratings, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        ratings: Number(ratings),
        comment,
    }
    const product = await products.findById(productId)
    // console.log(review.user._id.toString()==="62b5c29f338e6bf632e83126");
    // console.log(product, review);

    const isReviewed = false
    // product.ratings=product.reviews.forEach((rev)=>{
    //    const  avg+=rev.ratings
    // })
    if (isReviewed) {

    } else {
        product.reviews.push(review)
    }



})


