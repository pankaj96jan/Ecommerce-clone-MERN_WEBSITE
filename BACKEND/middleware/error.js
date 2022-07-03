const ErrorHandler = require("../UTILS/errorHandler")

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500
    err.message = err.message || "internal server error"

    //Wrong mongodb error
    if (err.name === "CastError") {
        const message = `Resource  not found.invalid:${err.path}`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })

}