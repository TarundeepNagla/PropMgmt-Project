import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import listingRouter from './routes/listing.route.js'
import agentRoutes from "./routes/agent.route.js"



dotenv.config();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log('MongoDb is connected')
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(express.json());
app.use(cors());
//  to extract cookie from browser
app.use(cookieParser());


app.listen(3000, () => {
    console.log('Server is running on port 3000')
}
);

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/listing', listingRouter);
app.use('/api/agent', agentRoutes);

// creating middle ware

app.use((err, req, res, next) => {
    const statusCode =err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })

});
