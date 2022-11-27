const userRouter = require("express").Router();
const {
    register,
    login
} = require("../controllers/auth.controller")

userRouter.post("/register", register)
userRouter.post("/login", login)


module.exports = userRouter;