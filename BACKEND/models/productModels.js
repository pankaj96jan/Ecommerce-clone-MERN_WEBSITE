const { default: mongoose } = require("mongoose");
const monoose = require("mongoose");

// Please enter
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please enter description"],
    },
    price: {
        type: Number,
        required: [true, "Please enter price"],
        maxLength: [8, "price cant exceed 8 characters"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            }
        },
        {
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Please enter category"],
    },
    Stock: {
        type: Number,
        required: [true, "Please enter product  Stock"],
        maxLength: [4],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "user",
                required: true
            }, 
            name: {
                type: String,
                require: true,
                default: ""
            },
            rating: {
                type: Number,
                required: true,
                default: ""

            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    cratedAt: {
        type: Date,
        default: Date.now
    }
});

const products = mongoose.model("Products", productSchema);


module.exports = products