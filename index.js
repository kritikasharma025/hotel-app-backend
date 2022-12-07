// Dev Dependencies
const express = require('express');
require('dotenv').config()
const cors = require('cors')

// Internal Dependencies
require("./utils/database.connection")
const placeRouter = require('./routes/places.route')
const authRouter = require("./routes/auth.route");
const hotelRouter = require('./routes/hotels.route');
const userRoute = require('./routes/user.route');

const app = express()
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(cors())

app.use("/api/place", placeRouter)
app.use("/api/auth", authRouter)
app.use("/api/hotel", hotelRouter)
app.use("/api/user", userRoute)

app.listen(PORT, ()=>{
    console.log(`Server is live on http://localhost:${PORT}`)
})