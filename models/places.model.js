const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    city:{type:String, unique:true, required:true, trim:true},
    country:{type:String, required:true, trim:true},
    price:{type:Number, required:true}
},{
    timestamps:true
})

const Place = mongoose.model("Place", placeSchema)

module.exports = Place