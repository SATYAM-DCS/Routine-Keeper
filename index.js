require('dotenv').config() // require .env 

const express = require('express');
const port = process.env.PORT || 8000;
const path = require('path'); // require path
const cookieParser = require('cookie-parser');  // require cookoe parser

const db = require('./config/mongoose'); // require db
const app = express(); 

const expressLayouts = require('express-ejs-layouts'); // require express-ejs-layout
const mongoose = require('mongoose'); // require mongoose
const MongoStore = require('connect-mongo'); // require connect-mongo

const session = require('express-session'); // require session

app.use(expressLayouts) // require ejs layout
app.set('view engine', 'ejs'); // set view engine
app.set('views', path.join(__dirname, 'views')) // set path

app.use(express.urlencoded({ extended: false }));  // use urlencoded

app.use(cookieParser()) // use cookie parser

app.use(express.static('assets')) // use static files 

// use session
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true
    })
);

app.use('/', require('./routes')); // use routes

// run surver on port 
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Running on port :: ${8000}`);
})