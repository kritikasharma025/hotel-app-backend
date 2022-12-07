const User = require("../models/users.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req,res) => {
    const {name, email, password} = req.body;
    try{
        if(!name || !email || !password){
            res.status(409).json({
                status:false,
                message:"All fields are required"
            })
        }else{
            const userExist = await User.findOne({email});
            if(userExist){
                res.status(409).json({
                    status:false,
                    message:"User already Exists."
                })
            }else{
                const hashedPassword = await bcrypt.hash(password, 12)

                const newUser = new User({name, email, password: hashedPassword})

                await newUser.save()

                const formattedUser = {
                    name: newUser.name,
                    email: newUser.email
                }
                
                res.json(formattedUser)
            }
        }
    }
    catch(err){
        res.status(err.status || 500).json({
            status:false,
            message: err.message || "Internal Server Error"
        })
    }
}

const login = async (req,res) => {
    const {email, password} = req.body;
    try{
        if(!email || !password){
            res.status(409).json({
                status:false,
                message:"All fields are required"
            })
        }else{
            const userExist = await User.findOne({email});

            if(userExist){
                if(await bcrypt.compare(password, userExist.password)){
                    const token = jwt.sign({id:userExist._id}, process.env.JWT_SECRET)
                    
                    res.cookie("jwToken", token).json({jwToken:token})
                }else{
                    // Error
                    res.status(409).json({
                        status:false,
                        message:"Invalid Credentials"
                    })
                }
            }
            else{
                // Error
                res.status(409).json({
                    status:false,
                    message:"Invalid Credentials"
                })
            }
        }
    }
    catch(err){
        res.status(err.status || 500).json({
            status:false,
            message: err.message || "Internal Server Error"
        })
    }
}

const verifyToken = async (req,res) => {
    let {authorization} = req.headers;
    try{
        if(!authorization || !authorization.startsWith("Bearer")){
            res.status(401).json({
                message:"Invalid Token"
            })
        }else{
            const {id} = jwt.verify(authorization.split(" ")[1], process.env.JWT_SECRET);

            const user = await User.findById(id)
            res.json({
                name:user.name,
                email:user.email,
                image: user.image
            })
        }
    }
    catch(err){
        res.status(err.status || 500).json({
            status:false,
            message: err.message || "Internal Server Error"
        })
    }
}

module.exports = {
    register,
    login,
    verifyToken
}