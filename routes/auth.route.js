const userRouter = require("express").Router();
const {
    register,
    login,
    verifyToken
} = require("../controllers/auth.controller")

userRouter.post("/register", register)     
userRouter.post("/login", login)
userRouter.post("/verifyToken", verifyToken)

module.exports = userRouter;


// userRouter.post("/register", register)  
            //          |            |
             //        Path         Action
