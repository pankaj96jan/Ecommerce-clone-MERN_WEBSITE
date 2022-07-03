const ErrorHandler = require("../UTILS/errorHandler");
const catchasyncErrors = require("../middleware/catchasyncErrors");

const User = require("../models/userModel");
const sendToken = require("../UTILS/jwttoken");
const sendEmail = require("../UTILS/sendEmail");

//Register a User

exports.registerUser = catchasyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample Id",
            url: "profilePicUrl",
        },
    });

    sendToken(user, 201, res);

    // const token = user.getJWTToken()
    // res.status(201).cookie("token", token, options).json({
    //     succes: true,
    //     // user
    //     token
    // })
});

//LoginUser

exports.loginUser = catchasyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    //checking if user has  given password and email both

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email And Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("invalid email or password", 401));
    }

    //   const isPasswordMatched = user.comparePassword(password);
    //   console.log(isPasswordMatched);
    // if (!isPasswordMatched) {
    //     return next(new ErrorHandler("invalid email or password", 401));
    // }

    sendToken(user, 201, res);

    // const token = user.getJWTToken()
    // res.status(200).cookie("token", token, options).json({
    //     succes: true,
    //     user ,
    //     token
    // })
});

//Logout User
exports.logoutUser = catchasyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        succes: true,
        message: "succesfully logout",
    });
});

//Forgot Password

exports.forgotPassword = catchasyncErrors(async (req, res, next) => {
    const userReseter = await User.findOne({
        email: req.body.email,
    });
    // console.log("user", userReseter);

    if (!userReseter) {
        return next(new ErrorHandler("User not Found", 404));
    }

    //Get   ResetPasswordToken
    //     const resetToken = user.getResetToken()
    //     console.log(resetToken,"usercontroller me");

    //     await user.save({ validateBeforeSave: false });
    //     const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    //     const message = `your password  reset token is :- \n\n ${resetPasswordUrl}\n\n,
    //   If you not requested this email then,please ignore it`;

    //     try {
    //         await sendEmail({
    //             email: user.email,
    //             subject: `Ecommerce Password Recovery`,
    //             message
    //         })
    //         res.json(200).json({
    //             success: true,
    //             message: `Email sent to ${user.email} succesfully`
    //         })

    //     } catch (error) {
    //         user.reserPasswordToken = undefined;
    //         user.resetPasswordExpire = undefined

    //         await user.save({ validateBeforeSave: false });

    //         return next(new ErrorHandler(error.message, 500))

    //     }
});

//Get User Detail
exports.getUserDetails = catchasyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
});

//updateUser password

exports.updatePassword = catchasyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    // const isPasswordMatched = await user.comparePassword(req.body.oldPassword,thi)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("old passowrd is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400));
    }
    user.password = req.body.newPassword;

    await user.save();
    sendToken(user, 200, res);

    // console.log(user);
    // res.status(200).json({
    //     success: true,
    //     user
    // })
});

exports.getAllUsers = catchasyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});
//Get a single User Details
exports.getSingleUser = catchasyncErrors(async (req, res, next) => {
    const userSingle = await User.findById(req.params.id);
    if (!userSingle) {
        return next(
            new ErrorHandler(`User Doesn't exists with id:${req.params.id}`)
        );
    }
    res.status(200).json({
        success: true,
        userSingle,
    });
});
// updated a user detail
exports.updateProfile = catchasyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    console.log(newUserData);
    //we will add  cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        succes: true,
    });
});

//UPdate User Role
exports.updateUserRole = catchasyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        sucess: true,
    })


})

exports.deleteUserAdmin = catchasyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    await user.remove()

    res.status(200).json({
        success: true,
        message:"User Deleted successfully"
    })
})

