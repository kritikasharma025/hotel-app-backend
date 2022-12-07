const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const updateUser = async (req,res)=>{
    const {authorization} = req.headers;
    try{
        if(!authorization || !authorization.startsWith("Bearer")){
            res.status(409).json({
                status:false,
                message: "Invalid token format."
            })
        }else{
            const { id } = jwt.verify(authorization.split(" ")[1], process.env.JWT_SECRET);

            const user = await User.findById(id);
            if(!user){
                res.status(401).json({
                    status:false,
                    message: "Unauthorized Access"
                })
            }else{
                const user = await User.findByIdAndUpdate(id, req.body);
                res.status(200).json({
                    status:true,
                    data:{
                        name:user.name,
                        email:user.email,
                        image: user.image
                    }
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

module.exports = {
    updateUser
}