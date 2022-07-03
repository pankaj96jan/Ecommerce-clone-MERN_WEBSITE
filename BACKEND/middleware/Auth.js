const ErrorHandler = require("../UTILS/errorHandler")
const catchasyncErrors = require("./catchasyncErrors")
const jwt = require("jsonwebtoken")
const user = require("../models/userModel")

exports.isAuthenticateUser = catchasyncErrors(async (req, res, next) => {
    const { token } = req.cookies

    // console.log(token);   ara-ara

    if (!token) {
        return next(new ErrorHandler("please Login to access  this resource", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decodedData.id)
    next()

})
//Autorize role for admin usre diffrence
exports.authorizeRoles = (...roles) => {
if(roles.includes("admin")){
    console.log("running");
}
}



