const express =require('express')
const app =express()
require('dotenv').config()
const  bodyParser = require('body-parser')
app.use(bodyParser.json());

const route=require('./routes/route')
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(`${process.env.MONGODB_URL}`, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

    app.use('/', route)

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})
