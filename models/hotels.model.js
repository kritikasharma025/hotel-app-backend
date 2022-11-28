const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    name: String,
    city: String,
    price: {
        type:Number,
        default:0
    },
    image: String
})

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;