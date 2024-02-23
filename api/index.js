import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
<<<<<<< HEAD
import authRoutes from './routes/auth.route.js'
=======
>>>>>>> be10ddff2d1ef973a54c70bbc4ec6670e880649e

dotenv.config();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log('MongoDb is connected')
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000')
}
);

<<<<<<< HEAD
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
=======
app.use('/api/user', userRoutes);
>>>>>>> be10ddff2d1ef973a54c70bbc4ec6670e880649e
