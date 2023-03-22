if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require("express")
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine' , 'ejs') // set up ejs for templating
app.set('views' , __dirname + '/views') // set up views folder
app.set('layout' , 'layouts/Layout') // set up layout folder
app.use(expressLayouts) // use express-ejs-layouts
app.use(express.static('public')) // folder 'public' to store html css etc.

const mongoose = require('mongoose')
 mongoose.connect(process.env.DATABASE_URL , { useNewUrlParser: true } )

const db = mongoose.connection
db.on('error' , error => console.error(error))
db.once('open' , () => console.error("Connected to Mongoose"))

app.use('/' , indexRouter)
app.listen(process.env.PORT || 3000) // listen to port 3000