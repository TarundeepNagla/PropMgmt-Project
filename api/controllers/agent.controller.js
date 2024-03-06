
import Agent from "../models/agent.model.js"
import { errorHandler } from "../utils/error.js";

export const createAgent = async (req, res, next) => {
    try {
        const agent = await Agent.create(req.body);
        return res.status(201).json(agent);
    } catch (error) {
        next(error)
        
    }
}

// Below functions are not being used for now. They are just for references. 

// export const deleteListing = async (req, res, next) => {
//     const listing = await Agent.findById(req.params.id);

//     if(!listing){
//         return next(errorHandler(401, 'Listing not found!'));
//     }

//     if (req.user.id !== listing.userRef){
//         return next(errorHandler(401, 'You can only delete your own listings!'));
//     }

//     try {
//         await Agent.findByIdAndDelete(req.params.id);
//         res.status(200).json('Listing has been deleted!!')
//     } catch (error) {
//         next(error)
//     }
// }

// export const updateListing = async (req, res, next) => {
//     const listing = await Agent.findById(req.params.id);
//     if (!listing) {
//         return next(errorHandler(404, 'Listing not found!'));
//     }
//     if (req.user.id !== listing.userRef) {
//         return next(errorHandler(401, 'You can only update your own listings...'))
//     }

//     try {
//         const updatedListing = await Agent.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             {new:true}
//         );
//         res.status(200).json(updatedListing)
//     } catch (error) {
//         next(error);
//     }

// }


// export const getListing = async (req, res, next) => {
//     try {
//         const listing = await Listing.findById(req.params.id);
//         if (!listing) {
//             return next(errorHandler(404, 'Listing not found!'))
//         }
//         res.status(200).json(listing);
//     } catch (error) {
//         next(error)
        
//     }
// }

