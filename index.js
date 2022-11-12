// Dev Dependencies
const express = require('express');
require('dotenv').config()
const cors = require('cors')

// Internal Dependencies
require("./utils/database.connection")
const placeRouter = require('./routes/places.route')

const app = express()
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(cors())

app.use("/api/place", placeRouter)

app.listen(PORT, ()=>{
    console.log(`Server is live on http://localhost:${PORT}`)
})