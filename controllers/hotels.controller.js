const Hotel = require("../models/hotels.model");

const findHotelCity = async (req,res) => {
    const { city } = req.body;
    try{
        const hotels = await Hotel.find({city});

        res.json({status:true,message:hotels})
    }
    catch(err){
        res.status(500).json({status:false, message:err.message})
    }
}

module.exports = {
    findHotelCity
}