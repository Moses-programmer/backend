const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// define routes
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');

// enviroment variables connects to file .env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({
        path: './.env'
    });
}

const port = process.env.PORT;
const dbconnection = process.env.MONGOURL;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// this line of code enables our server
app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
    console.log(`database url is ${dbconnection}`);
});


// Default test route/endpoint
app.get('/', (req, res) => {
    res.send('Server Online');
})

// Connect to MongoDB, then start server
mongoose.connect(dbconnection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error('Error connecting to MongoDB', err));

//    create api routes/endpoints
//rest apis
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);


//rest apis - representative state
//crud methods- create read update delete
//http methods- post get put delete