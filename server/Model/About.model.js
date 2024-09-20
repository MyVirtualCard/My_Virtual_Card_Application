import mongoose from "mongoose";


let AboutDetailSchema=new mongoose.Schema({
    user: {
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
        type:String,
        required:true 
   
    },
    Specialities:{
        type:String,
        required:true 
   
    }
},
{timestamps:true}
);



let AboutDetails=mongoose.model('AboutDetails',AboutDetailSchema);

export default AboutDetails;