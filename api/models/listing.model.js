import mongoose from 'mongoose';

// schemas are rules we defined to handle the database.
const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    }, 
    bathrooms:{
        type: Number,
        required: true,
    },
    bedrooms:{
        type: Number,
        required: true,
    },
    imageUrls:{
        type: Array,
        required: true,
    },
    agent:{
        type: String,
        required: true,
    }
  }, { timestamps: true }
);
  

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;