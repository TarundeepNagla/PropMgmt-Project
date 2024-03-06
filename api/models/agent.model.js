import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema(
  {
    agentname: {
      type: String,
      required: true,
      unique: true,
    },
    agentcompany: {
      type: String,
      required: false,
    },
    agentemail: {
      type: String,
      required: false,
      unique: true,
    },
    agentphone: {
      type: String,
      required: true,
      unique: true,
    }, 
    agentaddress: {
      type: String,
      required: true,
      
    },
    agentIdproof: {
      type: String,
      required: true,
      unique: true,
    },
  //   proofPicture: {
  //     type: String,
  //     default:
  //       'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  //     required: true,
  //   },
    service: {
      type: String,
      required: true,
      
    },
    createdByUser: {
      type: String,
      required: true,
    },

    agentPicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    
  }, { timestamps: true }

  );
    
  
  const Agent = mongoose.model('Agent', agentSchema);
  
  export default Agent;