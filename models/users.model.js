const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        min:5,
        max:30
    },
    email:{
        type:String,
        min:5,
        max:50,
        unique:true
    },
    password:{
        type:String, 
        min:5,
        max:30
    }
},{
    timestamps:true
})

const User = mongoose.model("User", userSchema);
module.exports = User;