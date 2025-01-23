import mongoose from "mongoose";


let AboutDetailSchema=new mongoose.Schema({
    UserName: {
        type: mongoose.Schema.Types.String,
        required: true,
      },
      URL_Alies:{
        type:String,
        required:true,
        unique:true
      },
      CompanyName:{
        type:String,
        required:true
      },
    Category:{
        type:String,
        required:true 
    },
    Year:{
        type: String,
        required:true 
    },
    Bussiness:{
        type:Array,
        required:true,
        min:1 
   
    },
    Specialities:{
        type:String,
        required:true 
   
    }
},
{timestamps:true}
);



let AboutDetail_Model=mongoose.model('About_Details',AboutDetailSchema);

export default AboutDetail_Model;