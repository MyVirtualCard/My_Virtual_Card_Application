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
    FirstName:{
        type:String,
        required:true 
    },
    LastName:{
        type:String,
        required:true 
    },
    Email:{
        type:String,
        required:true 
    },
    MobileNumber:{
        type:Number,
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
    Profession:{
        type:String,
        required:true
    }
},
{timestamps:true}
);



let BasicDetails=mongoose.model('BasicDetails',BasicDetailSchema);

export default BasicDetails;