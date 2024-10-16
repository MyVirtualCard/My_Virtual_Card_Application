import mongoose from "mongoose";


let BasicDetailSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.String,
        required: true,
      },
      URL_Alies:{
        type:String,
        required:true,
        unique:true
      },
    Email:{
        type:String,
        required:true 
    },
    MobileNumber:{
        type: String,
        required:true 
    },
    AlternateEmail:{
        type:String,
   
    },
    AlternateMobileNumber:{
        type:Number,
   
    },
    Location:{
        type:String,
        required:true 
    },
    Website_URL:{
        type:String,
        required:false
    }
},
{timestamps:true}
);



let BasicDetails=mongoose.model('BasicDetails',BasicDetailSchema);

export default BasicDetails;