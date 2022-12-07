const User = require("../models/users.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const handlebar = require("handlebars")
const fs = require('fs');
const path = require('path');
const { promisify } = require("util");

const readFile = promisify(fs.readFile)

const register = async (req,res) => {
    const {name, email, password} = req.body;
    let filePath = path.join(__dirname, "..", "static", "email1.html");
    let htmlFile = await readFile(filePath, 'utf-8')
    let transporter = nodemailer.createTransport({
        host:process.env.HOST,
        port:587,
        secure:false,
        service:"gmail",
        auth:{
            user:process.env.USER_EMAIL,
            pass:process.enb.USER-PASS
        }
    })
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
                
                let template = handlebar.compile(htmlFile);
                const data = {
                    username: newUser.name
                }
                let emailTemp = template(data)

                try{
                    let info = await transporter.sendMail({
                        from: 'KRIMO <krimo.com>',
                        to: newUser.email,
                        subject:`Welcome ${newUser.name} || Krimo`,
                        text:`Hi ${newUser.name}, your account has been succesfully created. Thanks!!`,
                        html: emailTemp
                    })
                    console.log("Mail sent: ", info.messageId)
                }
                catch(err){
                    res.status(err.status || 500).json({
                        status:false,
                        message: err.message || "Internal Server Error"
                    })
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