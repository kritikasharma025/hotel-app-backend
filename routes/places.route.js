const placeRouter = require("express").Router();
const {placeFromPrice} = require('../controllers/places.controller')

placeRouter.post("/", placeFromPrice)

module.exports = placeRouter;