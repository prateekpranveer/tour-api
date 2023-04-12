const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./schemas/user')
const cors = require('cors');
require('dotenv/config')
const app = express();
app.use(express.json())
app.use(cors());


// Import Routes
const usersRoute = require('./routes/userRoute')
const placeRoute = require('./routes/placeRoute')
const categoryRoute = require('./routes/categoryRoute')

app.use('/user', usersRoute);
app.use('/place', placeRoute);
app.use('/category', categoryRoute);

app.use(bodyParser.json());

// connect to DB
mongoose.connect(process.env.MONGO_URL).catch(error => console.log(error))


app.listen(4000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 4000);
})