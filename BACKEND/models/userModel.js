const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your  Name"],
        maxLength: [30, "Name  can't exceed  30 char"],
        minLength: [6, "Name  should have  more than 6 char"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your  Email"],

        unique: true,
        validate: [validator.isEmail, "Please Enter a Valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minlength: [8, "Password should have more than 8 char"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "User",
    },
    reserPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//JWT TOKEN

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

//compare password

userSchema.methods.comparePassword =async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const user = mongoose.model("User", userSchema);

//generating password rest token
userSchema.methods.getResetToken = function () {

    const resetToken = crypto.randomBytes(20)
    console.log(resetToken),"usermodel me";
    // const tokenCrypto=crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
    return resetToken

}



module.exports = user;
