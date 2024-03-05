
//  This is for authentication of the user using JSON Web token (JWT)
// This validates only the users who are signin can update their data. 
import jwt from 'jsonwebtoken';
import {errorHandler} from './error.js'

export const verifyToken =(req, res, next) => {
    // function to extract jwt token from cookie (received from browser(client))
    const token = req.cookies.access_token;
    if(!token) {
        return next(errorHandler(401, 'Unauthorized'));
    
    }
    // function to validate tokens authenticity.
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return next(errorHandler(401, 'Unauthorized'))
        }
        req.user = user;
        next();
    })
};