const userRoute = require("express").Router();
const { updateUser } = require("../controllers/user.controller")
 
userRoute.put("/", updateUser);

module.exports= userRoute;
