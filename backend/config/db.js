const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB =async() =>{
    try{
        mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con => {
        console.log(`MongoDB Connected: ${con.connection.host}`.cyan.underline.bold);
    })
    }catch(error){
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
}

module.exports = connectDB;