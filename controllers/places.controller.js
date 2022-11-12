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

module.exports = {
    placeFromPrice
}