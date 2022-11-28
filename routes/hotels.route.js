const {findHotelCity} = require("../controllers/hotels.controller");
const hotelRouter = require("express").Router();

hotelRouter.post("/", findHotelCity);

module.exports = hotelRouter;
