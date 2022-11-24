const placeRouter = require("express").Router();
const {placeFromPrice, getCountry, getUniqueCountry} = require('../controllers/places.controller')

placeRouter.post("/", placeFromPrice)
placeRouter.post("/getCountry", getCountry)
placeRouter.post("/getUniqueCountry", getUniqueCountry)

module.exports = placeRouter;