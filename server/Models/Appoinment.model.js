
import mongoose from 'mongoose';


let AppoinmentSchema=new mongoose.Schema({
      URL_Alies:{
        type:String,
      },
      FullName: {
        type: String,
        required:true
      },
      MobileNumber: {
        type: String,
        required:true
      },
      Date: {
        type: String,
        required:true
        
      },
      Time: {
        type: String,
        required:true
      },  
},{timestamps:true});


let AppoinmentModel=mongoose.model('Appoinment_Data',AppoinmentSchema);

export default AppoinmentModel;