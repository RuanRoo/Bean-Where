require('dotenv').config()

const express = require("express");
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
const  cors = require('cors')
const fse = require("fs-extra")
const sharp = require("sharp")
const path = require("path")

// when the app first launches, make sure the public/uploaded-photos folder exists
fse.ensureDirSync(path.join("../frontend/files", "uploaded-photos"))

// express app
const app = express()

app.use('/files', express.static('../frontend/files'))


// middleware
app.use(express.json())
app.use((req, res, next) => {
    next()
})
app.use(cors())

// routes
app.use('/api/posts', postRoutes)
app.use('/api/user', userRoutes)

// Serve frontend
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/')))
}

// connect to MONGOdb
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        
    })
    .catch((error) => {
    })

// listen for requests
app.listen(process.env.PORT, () => {
    console.log("connected to db and listening on port", process.env.PORT)
})