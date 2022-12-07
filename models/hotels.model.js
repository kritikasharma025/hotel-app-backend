const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    name: String,    // Name is attribute and String is its datatype
    city: String,
    price: {                      // In a same way price is attribute and its datatype is number.
        type:Number,
        default:0
    },
    image: String
})

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;

// Schema => 