const express = require('express');
const dotenv = require('dotenv')
const connectDB = require('./config/db.js');
const userRouter = require('./routes/userRoutes.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const cors = require('cors');

app.use(cors());


dotenv.config();

connectDB();


const app = express();
app.use(express.json());

app.use('/roboWar', userRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});