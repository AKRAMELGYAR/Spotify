const Dotenv = require('dotenv');
Dotenv.config({path : './config.env'})

const express = require('express');
const app = express();
const mongoose = require('mongoose')
app.use(express.json())

const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cors())
app.use(cookieParser())

const AppError = require('./utils/AppError')
////////ROUTES

///USERS
const userRoutes = require('./routes/userRoutes')
app.use('/users' , userRoutes)

///ERROR
app.all('*' , (req,res,next)=>{
    next(new AppError(`can not find ${req.originalUrl} on this server!` ,404))
})

////////DB Connection
mongoose.connect(process.env.URI)
.then(
    app.listen(process.env.PORT , ()=>{
        console.log(`Connected to server on port ${process.env.PORT}`)
    })
)
.catch(err=>{console.log(err)})






