import mongoose from 'mongoose';

let PrivacyPolicySchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.String,
        required: true,  
      },
      URL_Alies:{
        type:String,
        required:true
      },
    PrivacyPolicy:{
        type:String,
        required:true
    },
},{timestamps:true});


let PrivacyPolicyModel=mongoose.model('Privacy_Policy_Data',PrivacyPolicySchema);

export default PrivacyPolicyModel;