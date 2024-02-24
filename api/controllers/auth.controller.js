import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password || email ==='' || password ===''){
        next(errorHandler(400, 'All fields are mandatory'));

    }

    try {
        const validUser = await User.findOne({email});
        if (!validUser) {
            return next(errorHandler(404, 'Wrong credentials'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) {
            return next(errorHandler(400, 'Wrong credentials'));
        }

        const token = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET
        );
        //  to sepearate password from rest of the response. (as we are receiving password also as part of response) which should not be the case.
        const { password: pass, ...rest } = validUser._doc;
        res
        .status(200)
        .cookie('access_token', token, {
            httpOnly: true,
        }).json(rest);

    } catch (error) {
        // res.status(500).json({message: error.message}); Instead of this, will use next() middleware to handle errors. 
        next(error);
    }
}

