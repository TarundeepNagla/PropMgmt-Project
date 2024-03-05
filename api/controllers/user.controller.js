
import Listing from '../models/listing.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test =(req, res) => {
    res.json({message:'API Is working'})
};

export const updateUser = async (req, res, next) => {
    // user.id from Cookie we are receiving from (req.user) 
    //  for logged in user, UserId we can receive from (req.params). Now we need to match if both are same, user is authenticated.
    if (req.user.id != req.params.userId){
        return next(errorHandler(403, 'You are not allowed to update credentials'))
    }
    if (req.body.password){
        if(req.body.password.length <6){
            return next(errorHandler(400, 'Password must be at least 6 characters')); 
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
          return next(
            errorHandler(400, 'Username must be between 7 and 20 characters')
          );
        }
        if (req.body.username.includes(' ')) {
          return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
          return next(errorHandler(400, 'Username must be lowercase'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
          return next(
            errorHandler(400, 'Username can only contain letters and numbers')
          );
        };
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            }, {new: true});
            const { password, ...rest } = updatedUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error);
        }

    } 
}   
export const signout =(req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('user has signed out')
    } catch (error) {
        next(error)
    }
};

export const getUserListing = async (req, res, next) => {
    
    if (req.user.id == req.params.userId){
        try {
            const listing = await Listing.find({userRef: req.params.userId })
            res.status(200).json(listing);
        } catch (error) {
            
        }
    }else{
        return next(errorHandler(401, 'You can view your own listing!'))
    }

}

export const getTotalListing = async (req, res, next) => {
    
    if (req.user.id == req.params.userId){
        try {
            const listing = await Listing.countDocuments({userRef: req.params.userId })
            res.status(200).json(listing);
        } catch (error) {
            
        }
    }else{
        return next(errorHandler(401, 'You can view your own listing!'))
    }

}