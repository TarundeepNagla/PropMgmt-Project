import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';


export const signup = async (req, res,next) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password || username ==='' || email ==='' || password ===''){
        // return res.status(400).json({message: 'All fields are mandatory'})
        // below is to handle pre-defined errors by invoking errorHandler function from utils. 
        next(errorHandler(400, 'All fields are mandatory'));
        // next(err);
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });


    try {
        await newUser.save();
        res.json('Signup successful')
    } catch (error) {
        // res.status(500).json({message: error.message}); Instead of this, will use next() middleware to handle errors. 
        next(error);
    }

};

