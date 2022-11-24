const Place = require('../models/places.model')

const placeFromPrice = async (req,res)=>{
    try{
        const { startPrice, endPrice } = req.body;

        const placeData = await Place.find({price:{$gt: startPrice || 0, $lt:Number(endPrice)}})

        // console.log(placeData)

        res.json({
            status:true,
            data:placeData
        })
    }
    catch(err){
        res.status(500).json({
            status:false,
            message:err.message
        })
    }
}

const getCountry=async (req,res) =>{
    const {country} = req.body;
    try{
        const searchCountry = await Place.find({country:{$regex: "^" + country}}) 
        
        res.json({
            status:true,
            message:searchCountry
        })
    }catch (err){
        res.status(500).json({
            status:false,
            message:err.message
        })
    }
}

const getUniqueCountry = async (req,res) => {
    const { country } = req.body;

    const countryData = await Place.find({country:{$regex: "^" + country}}).distinct('country'); 
    try{    
        res.json({
            status:true,
            message: countryData
        })
    }   
    catch(err){
        res.status(500).json({
            status:false,
            message:err.message
        })
    }
}

module.exports = {
    placeFromPrice,
    getCountry,
    getUniqueCountry
}