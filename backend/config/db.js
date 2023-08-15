const mongoose = require('mongoose');


// need to add MONGO_URL in .env file
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology : true,
        });
        console.log(`Successfuly connected to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
}


module.exports = connectDB;