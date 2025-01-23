import mongoose from "mongoose";


let BasicDetailSchema=new mongoose.Schema({
    UserName: {
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



let BasicDetail_Model=mongoose.model('BasicDetail',BasicDetailSchema);

export default BasicDetail_Model;