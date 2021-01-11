const express = require('express')
const app = express()
const path = require('path')
const dbcon = require('./config/db')
var methodOverride = require('method-override')
var session= require('express-session')
//session express
app.use(session({
    secret : 'this is just a review',
    resave : true,
    saveUninitialized : true,
    cookie : {maxAge : 100000}
}))
//set template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
//connect route to database
app.use(function(req, res, next){
    req.dbcon = dbcon
    next()
})

// body parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
//route registration
const adminRoute = require('./routes/adminRoute')
app.use('/admin', adminRoute)

const clientRoute = require('./routes/clientRoute')
app.use('/', clientRoute)
//app port listen
app.listen(3000, function(){
    console.log('Server is running on port 3000')
})