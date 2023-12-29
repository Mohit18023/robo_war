const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const homeRoutes = require('./routes/homeRoutes');
const socketio = require('socket.io');
const http = require('http');


const app = express();
const server = http.createServer(app);



dotenv.config();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/robowar/auth',userRoutes);
app.use('/robowar/home',homeRoutes);
app.use('/robowar/game',(req,res) => {
    console.log('game route');
    
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));